import { ConflictException, Injectable } from '@nestjs/common';
import { MedicalInsuranceRepository } from './medical-insurance.repostiory';
import { CreateMedicalInsuranceDto } from './dtos/create-medical-insurance.dto';
import { User } from '@entities/users/users.entity';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';

@Injectable()
export class MedicalInsuranceService {
    constructor(private readonly repository: MedicalInsuranceRepository) { }

    async create(data: CreateMedicalInsuranceDto, user: User): Promise<MedicalInsurance> {
        const { cnpj } = data;

        let register = await this.repository.findByCnpj(cnpj);

        if (register) {
            throw new ConflictException(`O CNPJ ${cnpj} já existe`);
        }

        register = this.repository.create(data);
        register.userId = user.id;
        await this.repository.save(register);

        return register;
    }
}
