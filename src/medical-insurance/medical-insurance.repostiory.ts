import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MedicalInsuranceRepository extends Repository<MedicalInsurance> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(MedicalInsurance, dataSource.createEntityManager());
    }

    async findByCnpj(cnpj: string) {
        return await this.findOneBy({ cnpj });
    }
}