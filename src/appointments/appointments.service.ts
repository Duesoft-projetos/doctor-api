import { Appointment, AppointmentStatus } from '@entities/appointments/appointment.entity';
import { AppointmentReasonCancellation } from '@entities/appointments/appointments.reason.cancellation.entity';
import { User } from '@entities/users/users.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { addMinutes } from 'date-fns';

import { CancelAppointmentDto } from './dtos/cancel-appointment.dto';
import { CreateAppointmentDto, CreateWaitingAppointmentDto } from './dtos/create-appointment.dto';
import { CreateReasonCancellationAppointment } from './dtos/create-reason-cancellation-appointment.dto';
import { ListAppointmentDto } from './dtos/list-appointment-today.dto';
import { RescheduleAppointmentDto } from './dtos/reschedule-appointment.dto';
import { AppointmentReasonCancellationRepository } from './repositories/appointments.reason.cancellation.repository';
import { AppointmentRepository } from './repositories/appointments.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly reasonRepository: AppointmentReasonCancellationRepository,
  ) { }

  async createReasonCancellation(
    data: CreateReasonCancellationAppointment,
    user: User,
  ): Promise<AppointmentReasonCancellation> {
    const { description } = data;

    let register = await this.reasonRepository.findByDescription(description);

    if (register) {
      throw new ConflictException(`Registro '${description}' já existe`);
    }

    register = this.reasonRepository.create(data);
    register.userId = user.id;

    await this.reasonRepository.save(register);

    return register;
  }

  async listReasonCancellation(): Promise<AppointmentReasonCancellation[]> {
    return await this.reasonRepository.findBy({ isActive: true });
  }

  async create(data: CreateAppointmentDto, user: User): Promise<Appointment> {
    const { scheduledTime, ...rest } = data;
    const register = this.repository.create(rest);

    register.userId = user.id;
    register.scheduledStart = scheduledTime;
    register.scheduledEnd = addMinutes(scheduledTime, 30);

    await this.repository.save(register);
    return register;
  }

  async createWaiting(data: CreateWaitingAppointmentDto, user: User): Promise<Appointment> {
    const register = this.repository.create(data);

    register.userId = user.id;
    register.status = AppointmentStatus.waiting;

    await this.repository.save(register);
    return register;
  }

  async activate(id: number, data: CreateAppointmentDto): Promise<Appointment> {
    const { scheduledTime, ...rest } = data;

    const register = await this.repository.findOneBy({ id, status: AppointmentStatus.waiting })

    if (!register) {
      throw new NotFoundException(`Registro ID ${id} não encontrado`)
    }

    register.status = AppointmentStatus.active
    register.scheduledStart = scheduledTime;
    register.scheduledEnd = addMinutes(scheduledTime, 30);

    Object.keys(rest).forEach(key => {
      register[key] = rest[key];
    })

    await this.repository.save(register)
    return register
  }

  async list(data: ListAppointmentDto) {
    const registers = await this.repository.search(data);

    return registers.reduce((acc, { professional, professionalId: key, ...item }) => {
      if (!acc[key]) {
        acc[key] = {
          id: key,
          name: professional.name,
          appointments: [],
        };
      }

      acc[key].appointments.push(item);

      return acc;
    }, {});
  }

  async findById(id: number): Promise<Appointment> {
    const register = await this.repository.findOne({
      where: { id },
      relations: ['professional'],
    });

    if (!register) {
      throw new NotFoundException(`Registro ${id} não encontrado`);
    }

    return register;
  }

  async cancelById(data: CancelAppointmentDto): Promise<void> {
    const { id, reasonCancellationId, descriptionCancellation } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ${id} não encontrado`);
    }

    if (register.status === AppointmentStatus.canceled) {
      throw new NotFoundException(`Agendamento ${id} já cancelado`);
    }

    register.status = AppointmentStatus.canceled;
    register.reasonCancellationId = reasonCancellationId;
    register.descriptionCancellation = descriptionCancellation;

    await this.repository.save(register);
  }

  async rescheduleById(data: RescheduleAppointmentDto): Promise<void> {
    const { id, professionalId, scheduledDate } = data;

    const register = await this.repository.findOneBy({ id });

    if (!register) {
      throw new NotFoundException(`Registro ${id} não encontrado`);
    }

    if (register.status !== AppointmentStatus.active) {
      throw new NotFoundException(`Registro com status ${register.status} não pode ser reagendado`);
    }

    register.professionalId = professionalId;
    register.scheduledStart = scheduledDate;
    register.scheduledEnd = addMinutes(scheduledDate, 30);

    await this.repository.save(register);
  }
}
