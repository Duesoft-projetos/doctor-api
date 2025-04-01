import { ConflictException, Injectable } from '@nestjs/common';
import { VisitorRepository } from './repositories/visitors.repository';
import { CreateTypeVisitorDto } from './dtos/create-type-visitor.dto';
import { VisitorType } from '@entities/visitors/visitor.subject.entity';
import { VisitorTypeRepository } from './repositories/visitor.type.repository';
import { User } from '@entities/users/users.entity';

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

    async list(): Promise<VisitorType[]> {
        const registers = await this.typeRepository.findBy({ isActive: true })
        return registers
    }
}
