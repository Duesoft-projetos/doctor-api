import { ConflictException, Injectable } from '@nestjs/common';
import { ProfessionalRepository } from './professional.repository';
import { Professional } from '@entities/professional/professional.entity';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { User } from '@entities/users/users.entity';

@Injectable()
export class ProfessionalService {
    constructor(private readonly repository: ProfessionalRepository) { }

    async create(data: CreateProfessionalDto, user: User): Promise<Professional> {
        const { document } = data;

        let register = await this.repository.findByDocument(document);

        if (register) {
            throw new ConflictException(`Profissional ${document} já existe`);
        }

        register = this.repository.create(data);
        register.userId = user.id;
        await this.repository.save(register);

        return register;
    }

    async list(): Promise<Professional[]> {
        return await this.repository.findBy({ isActive: true });
    }
}
