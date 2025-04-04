import { Service, ServiceStatus } from '@entities/services/services.entity';
import { User } from '@entities/users/users.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from 'src/appointments/repositories/appointments.repository';

import { CreateServiceDto } from './dtos/create-service.dto';
import { ListServiceDto } from './dtos/list-service.dto';
import { ReadToServeService } from './dtos/read-to-serve-service.dto';
import { ServiceRepository } from './repositories/services.repository';
import { In } from 'typeorm';
import { ReprioritizeServicesDto } from './dtos/reprioritize-service.dto';
import { Serving } from './dtos/serving.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) { }

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

  async readyToServe(data: ReadToServeService): Promise<Service> {
    const { id } = data;

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
    register.officeKey = register.professionalId.toString().padStart(2, '0');

    await this.repository.save(register);
    return register;
  }

  async serving(data: Serving): Promise<Service> {
    const { id } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`);
    }

    if (![ServiceStatus.waiting, ServiceStatus.read].includes(register.status)) {
      throw new BadRequestException(
        `Registro com status ${register.status} não pode ser atualizado`
      );
    }

    register.startedIn = new Date();
    register.status = ServiceStatus.started;

    await this.repository.save(register);
    return register;
  }

  async reprioritize(data: ReprioritizeServicesDto): Promise<void> {
    const { ids } = data;

    const registers = await this.repository.findBy({ id: In(ids) });

    const promises = ids.map(async (id, index) => {
      const register = registers.find(item => item.id === id);

      if (register) {
        register.priority = index + 1;
        await this.repository.save(register);
      }
    })

    await Promise.all(promises);
  }
}
