import { Visitor } from '@entities/visitors/visitors.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VisitorRepository extends Repository<Visitor> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Visitor, dataSource.createEntityManager());
    }
}
