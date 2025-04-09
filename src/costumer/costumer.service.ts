import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CostumerRepository } from './costumer.repository';
import { User } from '@entities/users/users.entity';
import { Costumer } from '@entities/costumers/costumers.entity';
import { CreateCostumerDto } from './dtos/create-costumer.dto';
import { FindCostumerDto } from './dtos/find-costumer.dto';

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

    async update(id: number, data: CreateCostumerDto): Promise<Costumer> {
        const register = await this.repository.findOneBy({ id });

        if (!register) {
            throw new NotFoundException(`Registro com ID ${id} não encontrado`)
        }

        Object.keys(data).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(register, key)) {
                register[key] = data[key]
            }
        })

        await this.repository.save(register);
        return register;
    }

    async find(data: FindCostumerDto): Promise<Costumer | null> {
        const { name, birthday } = data;

        const register = await this.repository.findUnique(name, birthday);
        return register;
    }

    async list(): Promise<Costumer[]> {
        return await this.repository.findBy({ isActive: true });
    }
}
