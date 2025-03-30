import { Appointment } from '@entities/appointments/appointment.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Appointment, dataSource.createEntityManager());
    }

    async search(costumerName?: string, professionalId?: number) {
        const wheres: Array<string> = [];

        if (costumerName) {
            wheres.push(`unaccent(appointment.costumer_name) ILIKE unaccent('%${costumerName}%')`);
        }

        if (professionalId) {
            wheres.push(`appointment.professional_id = ${professionalId}`);
        }

        return this.createQueryBuilder('appointment')
            .where(wheres.join(' AND '))
            .leftJoinAndSelect('appointment.medicalInsurance', 'insurance')
            .leftJoinAndSelect('appointment.professional', 'professional')
            .getMany();
    }
}