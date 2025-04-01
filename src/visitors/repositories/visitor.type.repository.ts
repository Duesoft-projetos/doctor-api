import { VisitorType } from '@entities/visitors/visitor.subject.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VisitorTypeRepository extends Repository<VisitorType> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(VisitorType, dataSource.createEntityManager());
    }

    async findUnique(description: string) {
        return this.createQueryBuilder('type')
            .where('unaccent(type.description) ILIKE unaccent(:description)', { description: `%${description}%` })
            .getOne()
    }
}
