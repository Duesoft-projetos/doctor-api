import { PaymentMethod } from '@entities/payment-method/payment-method.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentMethodRepository extends Repository<PaymentMethod> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(PaymentMethod, dataSource.createEntityManager());
    }

    async findByDescription(description: string) {
        return await this.createQueryBuilder('method')
            .where('unaccent(method.description) ILIKE unaccent(:description)', { description: `%${description}%` })
            .getOne()
    }

    async filter() {
        return await this.createQueryBuilder('method')
            .where('method.is_active = TRUE')
            .getMany();
    }
}