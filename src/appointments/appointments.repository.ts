import { Appointment } from '@entities/appointments/appointment.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ListAppointmentDto } from './dtos/list-appointment-today.dto';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Appointment, dataSource.createEntityManager());
    }

    async search(data: ListAppointmentDto) {
        const { status, costumerName, professionalId, scheduleDate } = data;
        const wheres: Array<string> = [];

        if (costumerName) {
            wheres.push(`unaccent(appointment.costumer_name) ILIKE unaccent('%${costumerName}%')`);
        }

        if (professionalId) {
            wheres.push(`appointment.professional_id = ${professionalId}`);
        }

        if (scheduleDate) {
            wheres.push(`appointment.scheduled_start::date = '${scheduleDate}'`)
        }

        if (status) {
            wheres.push(`appointment.status = '${status}'`)
        }

        return this.createQueryBuilder('appointment')
            .where(wheres.join(' AND '))
            .leftJoinAndSelect('appointment.medicalInsurance', 'insurance')
            .leftJoinAndSelect('appointment.professional', 'professional')
            .getMany();
    }
}