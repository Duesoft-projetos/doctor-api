import { Professional } from '@entities/professional/professional.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfessionalRepository extends Repository<Professional> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Professional, dataSource.createEntityManager());
    }

    async findByDocument(document: string) {
        return await this.findOneBy({ document });
    }
}