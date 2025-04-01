import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { VisitorRepository } from './repositories/visitors.repository';
import { CreateTypeVisitorDto } from './dtos/create-type-visitor.dto';
import { VisitorType } from '@entities/visitors/visitor.subject.entity';
import { VisitorTypeRepository } from './repositories/visitor.type.repository';
import { User } from '@entities/users/users.entity';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { Visitor, VisitorStatus } from '@entities/visitors/visitors.entity';
import { ListVisitorDto } from './dtos/list-visitor.dto';

@Injectable()
export class VisitorsService {
    constructor(
        private readonly repository: VisitorRepository,
        private readonly typeRepository: VisitorTypeRepository
    ) { }

    async createType(data: CreateTypeVisitorDto, user: User): Promise<VisitorType> {
        const { description } = data;

        let register = await this.typeRepository.findUnique(description)

        if (register) {
            throw new ConflictException(`Assunto '${description}' já cadastrado`)
        }

        register = this.typeRepository.create(data);
        register.userId = user.id;

        await this.typeRepository.save(register);
        return register;
    }

    async listTypes(): Promise<VisitorType[]> {
        const registers = await this.typeRepository.findBy({ isActive: true })
        return registers
    }

    async create(data: CreateVisitorDto, user: User): Promise<Visitor> {
        const register = this.repository.create(data);
        register.userId = user.id

        await this.repository.save(register)
        return register
    }

    async list(data: ListVisitorDto): Promise<Visitor[]> {
        const registers = await this.repository.list(data)
        return registers
    }

    async serve(id: number): Promise<void> {
        const register = await this.repository.findOneBy({ id })

        if (!register) {
            throw new NotFoundException(`Registro ${id} não encontrado`)
        }

        register.status = VisitorStatus.served
        await this.repository.save(register)
    }
}
