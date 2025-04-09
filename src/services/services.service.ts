import { Service, ServiceStatus } from '@entities/services/services.entity';
import { User } from '@entities/users/users.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from 'src/appointments/repositories/appointments.repository';
import { In } from 'typeorm';

import { CreateServiceDto } from './dtos/create-service.dto';
import { FinishServiceDto } from './dtos/finish-service.dto';
import { ListServiceDto } from './dtos/list-service.dto';
import { ReadToServeService } from './dtos/read-to-serve-service.dto';
import { ReprioritizeServicesDto } from './dtos/reprioritize-service.dto';
import { ServingDto } from './dtos/serving.dto';
import { ServiceRepository } from './repositories/services.repository';

@Injectable()
export class ServicesService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(data: CreateServiceDto, user: User): Promise<Service> {
    const { appointmentId, ...rest } = data;

    const register = this.repository.create(rest);
    register.userId = user.id;

    this.appointmentRepository.delete({ id: appointmentId });

    await this.repository.save(register);
    return register;
  }

  async list(data: ListServiceDto): Promise<Service[]> {
    const registers = await this.repository.list(data);

    return registers;
  }

  async readyToServe(id: number, data: ReadToServeService): Promise<Service> {
    const { office } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`);
    }

    if (register.status !== ServiceStatus.waiting) {
      throw new BadRequestException(
        `Registro com status ${register.status} não pode ser atualizado`,
      );
    }

    register.status = ServiceStatus.read;
    register.officeKey = office.padStart(2, '0');

    await this.repository.save(register);
    return register;
  }

  async serving(data: ServingDto): Promise<Service> {
    const { id } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`);
    }

    if (![ServiceStatus.waiting, ServiceStatus.read].includes(register.status)) {
      throw new BadRequestException(
        `Registro com status ${register.status} não pode ser atualizado`,
      );
    }

    register.startedIn = new Date();
    register.status = ServiceStatus.started;

    await this.repository.save(register);
    return register;
  }

  async finish(data: FinishServiceDto): Promise<Service> {
    const { id } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`);
    }

    if (register.status !== ServiceStatus.started) {
      throw new BadRequestException(
        `Registro com status ${register.status} não pode ser finalizado`,
      );
    }

    register.total = 90;
    register.finishedIn = new Date();
    register.status = ServiceStatus.finished;

    await this.repository.save(register);
    return register;
  }

  async complete(id: number): Promise<Service> {
    const register = await this.repository.findOneBy({ id, isActive: true });

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`);
    }

    register.status = ServiceStatus.completed;

    await this.repository.save(register);
    return register;
  }

  async reprioritize(data: ReprioritizeServicesDto): Promise<void> {
    const { ids } = data;

    const registers = await this.repository.findBy({ id: In(ids) });

    const promises = ids.map(async (id, index) => {
      const register = registers.find((item) => item.id === id);

      if (register) {
        register.priority = index + 1;
        await this.repository.save(register);
      }
    });

    await Promise.all(promises);
  }

  async findById(id: number): Promise<Service | null> {
    const register = await this.repository.findOne({
      where: { id, isActive: true },
      relations: ['costumer', 'professional'],
    });

    return register;
  }
}
