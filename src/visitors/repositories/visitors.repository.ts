import { Visitor } from '@entities/visitors/visitors.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ListVisitorDto } from '../dtos/list-visitor.dto';

@Injectable()
export class VisitorRepository extends Repository<Visitor> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Visitor, dataSource.createEntityManager());
    }

    async list(data: ListVisitorDto) {
        const { status, scheduledDate, professionalId } = data;
        const wheres: string[] = [];

        if (status) {
            wheres.push(`visitor.status = '${status}'`)
        }

        if (scheduledDate) {
            wheres.push(`visitor.created_at::date = '${scheduledDate}'`)
        }

        if (professionalId) {
            wheres.push(`visitor.professional_id = ${professionalId}`)
        }

        return await this.createQueryBuilder('visitor')
            .where(wheres.join(' AND '))
            .leftJoinAndSelect('visitor.type', 'type')
            .leftJoinAndSelect('visitor.professional', 'professional')
            .orderBy('visitor.created_at', 'DESC')
            .getMany()
    }
}
