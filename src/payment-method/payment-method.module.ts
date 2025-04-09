import { Module } from '@nestjs/common';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodRepository, PaymentMethodService]
})
export class PaymentMethodModule { }
