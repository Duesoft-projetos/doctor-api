import { ConflictException, Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';
import { User } from '@entities/users/users.entity';
import { PaymentMethod } from '@entities/payment-method/payment-method.entity';

@Injectable()
export class PaymentMethodService {
    constructor(private readonly repository: PaymentMethodRepository) { }

    async create(data: CreatePaymentMethodDto, user: User): Promise<PaymentMethod> {
        const { description } = data;

        let register = await this.repository.findByDescription(description);

        if (register) {
            throw new ConflictException(`Registro com descrição '${description}' já existe`);
        }

        register = this.repository.create(data);
        register.userId = user.id;

        await this.repository.save(register);
        return register;
    }

    async list(): Promise<PaymentMethod[]> {
        return await this.repository.filter();
    }
}
