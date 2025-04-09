import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicePaymentRepository } from './repositories/service-payment.repository';
import { ServicePayment } from '@entities/services-payment/service-payment.entity';
import { User } from '@entities/users/users.entity';
import { CreateServicePaymentDto } from './dtos/create-service-payment.dto';
import { ServicesService } from 'src/services/services.service';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { PaymentMethodType } from '@entities/payment-method/payment-method-type';
import { FilterServicePaymentDto } from './dtos/filter-service-payment.dto';

@Injectable()
export class ServicesPaymentService {
    constructor(
        private readonly repository: ServicePaymentRepository,
        private readonly service: ServicesService,
        private readonly methodService: PaymentMethodService
    ) { }

    async create(data: CreateServicePaymentDto, user: User): Promise<ServicePayment> {
        const { serviceId } = data;

        let register = await this.repository.findOneBy({ serviceId });

        if (register) {
            throw new ConflictException(`Serviço já há registro de pagamento`);
        }

        const serviceRegister = await this.service.findById(serviceId);

        if (!serviceRegister) {
            throw new NotFoundException(`Registro de consulta ID ${serviceId} não encontrado`);
        }

        const paymentMethods = await this.methodService.list();
        const complimentaryMethods = paymentMethods.filter(item => item.type === PaymentMethodType.complimentary).map(item => item.id);

        let invalidMethods = data.methods.map(item => item.id).filter(item => !paymentMethods.map(r => r.id).includes(item));

        if (invalidMethods.length > 0) {
            throw new BadRequestException(`Métodos de pagamento com ID(s) ${invalidMethods.join(', ')} inválidos`);
        }

        // filtrando o método cortesia
        invalidMethods = data.methods.map(item => item.id).filter(item => complimentaryMethods.includes(item));

        if (data.methods.length !== invalidMethods.length || invalidMethods.length > 1) {
            throw new BadRequestException(data.methods.length !== invalidMethods.length ?
                `Não é possível usar método 'Cortesia' com outros métodos` :
                `Informe apenas um método 'Cortesia'`
            );
        }

        register = this.repository.create(data);

        register.userId = user.id;
        register.costumerId = serviceRegister.costumerId;
        register.professionalId = serviceRegister.professionalId;
        register.complimentary = invalidMethods.length > 0;

        await this.repository.save(register);
        return register;
    }

    async findByService(id: number): Promise<ServicePayment | null> {
        const register = await this.repository.findOneBy({ serviceId: id });
        return register;
    }

    async list(data: FilterServicePaymentDto): Promise<ServicePayment[]> {
        const registers = await this.repository.filter(data);
        return registers;
    }
}
