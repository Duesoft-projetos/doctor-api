import { ServicePayment } from '@entities/services-payment/service-payment.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FilterServicePaymentDto } from '../dtos/filter-service-payment.dto';

@Injectable()
export class ServicePaymentRepository extends Repository<ServicePayment> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(ServicePayment, dataSource.createEntityManager());
    }

    async filter(data: FilterServicePaymentDto) {
        const { startDate, endDate } = data;

        return await this.createQueryBuilder('payment')
            .where(`payment.created_at between :startDate AND :endDate`, { startDate, endDate })
            .getMany()
    }
}