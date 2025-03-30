import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { User } from '@entities/users/users.entity';
import { Appointment } from '@entities/appointments/appointment.entity';
import { ListAppointmentTodayDto } from './dtos/list-appointment-today.dto';
import { addMinutes } from 'date-fns';

@Injectable()
export class AppointmentsService {
    constructor(private readonly repository: AppointmentRepository) { }

    async create(data: CreateAppointmentDto, user: User): Promise<Appointment> {
        const { scheduledTime, ...rest } = data;
        const register = this.repository.create(rest);

        register.scheduledStart = scheduledTime;
        register.scheduledEnd = addMinutes(scheduledTime, 30);
        register.userId = user.id;

        await this.repository.save(register);
        return register;
    }

    async listToday(data: ListAppointmentTodayDto) {
        const { costumerName, professionalId } = data;

        const registers = await this.repository.search(costumerName, professionalId);
        return registers;
    }
}
