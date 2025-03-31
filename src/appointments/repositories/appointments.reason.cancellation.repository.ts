import { AppointmentReasonCancellation } from '@entities/appointments/appointments.reason.cancellation.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AppointmentReasonCancellationRepository extends Repository<AppointmentReasonCancellation> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(AppointmentReasonCancellation, dataSource.createEntityManager());
  }

  async findByDescription(description: string) {
    return await this.createQueryBuilder('reason')
      .where('unaccent(reason.description) ILIKE unaccent(:description)', {
        description: `%${description}%`,
      })
      .getOne();
  }
}
