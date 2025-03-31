import { Service } from '@entities/services/services.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ListServiceDto } from '../dtos/list-service.dto';

@Injectable()
export class ServiceRepository extends Repository<Service> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(Service, dataSource.createEntityManager());
  }

  async list(data: ListServiceDto) {
    const { status, costumerId, professionalId, scheduleDate } = data;
    const wheres: Array<string> = [];

    if (status?.length) {
      wheres.push(`service.status IN ('${status.join("', '")}')`);
    }

    if (costumerId) {
      wheres.push(`service.costumer_id = ${costumerId}`);
    }

    if (professionalId) {
      wheres.push(`service.professional_id = ${professionalId}`);
    }

    if (scheduleDate) {
      wheres.push(`service.scheduled_start::date = '${scheduleDate}'`);
    }

    return this.createQueryBuilder('service')
      .where(wheres.join(' AND '))
      .leftJoinAndSelect('service.costumer', 'costumer')
      .leftJoinAndSelect('service.medicalInsurance', 'medical_insurance')
      .leftJoinAndSelect('service.professional', 'professional')
      .getMany();
  }
}
