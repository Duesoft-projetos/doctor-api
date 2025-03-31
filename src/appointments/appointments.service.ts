import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { User } from '@entities/users/users.entity';
import { Appointment, AppointmentStatus } from '@entities/appointments/appointment.entity';
import { ListAppointmentDto } from './dtos/list-appointment-today.dto';
import { addMinutes } from 'date-fns';
import { CancelAppointmentDto } from './dtos/cancel-appointment.dto';

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

    async list(data: ListAppointmentDto) {
        const registers = await this.repository.search(data);

        return registers.reduce((acc, { professional, professionalId: key, ...item }) => {
            if (!acc[key]) {
                acc[key] = {
                    id: key,
                    name: professional.name,
                    appointments: []
                }
            }

            acc[key].appointments.push(item);

            return acc;
        }, {});
    }

    async findById(id: number): Promise<Appointment> {
        const register = await this.repository.findOne({
            where: { id },
            relations: ['professional']
        });

        if (!register) {
            throw new NotFoundException(`Registro ${id} não encontrado`);
        }

        return register;
    }

    async cancelById(data: CancelAppointmentDto): Promise<void> {
        const { id, reasonCancellation } = data;

        const register = await this.repository.findOneBy({ id });

        if (!register) {
            throw new NotFoundException(`Registro ${id} não encontrado`);
        }

        if (register.status === AppointmentStatus.canceled) {
            throw new NotFoundException(`Agendamento ${id} já cancelado`);
        }

        register.status = AppointmentStatus.canceled;
        register.reasonCancellation = reasonCancellation;

        await this.repository.save(register);
    }
}
