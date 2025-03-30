import { Costumer } from '@entities/costumers/costumers.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CostumerRepository extends Repository<Costumer> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Costumer, dataSource.createEntityManager());
    }

    async findUnique(name: string, birthday: string) {
        return await this.createQueryBuilder('costumer')
            .where("unaccent(costumer.name) ILIKE unaccent(:name) AND costumer.birthday = :birthday", { name: `%${name}%`, birthday })
            .getOne()
    }
}