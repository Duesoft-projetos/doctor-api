import { ConflictException, Injectable } from '@nestjs/common';
import { CostumerRepository } from './costumer.repository';
import { User } from '@entities/users/users.entity';
import { Costumer } from '@entities/costumers/costumers.entity';
import { CreateCostumerDto } from './dtos/create-costumer.dto';

@Injectable()
export class CostumerService {
    constructor(private readonly repository: CostumerRepository) { }

    async create(data: CreateCostumerDto, user: User): Promise<Costumer> {
        const { name, birthday } = data;

        let register = await this.repository.findUnique(name, birthday);

        if (register) {
            throw new ConflictException(`O paciente ${name} nascido em ${birthday} já existe`)
        }

        register = this.repository.create(data);
        register.userId = user.id;
        await this.repository.save(register);

        return register;
    }

    async list(): Promise<Costumer[]> {
        return await this.repository.findBy({ isActive: true });
    }
}
