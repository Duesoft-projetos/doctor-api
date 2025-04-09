import { Module } from '@nestjs/common';
import { ServicesPaymentController } from './services-payment.controller';
import { ServicesPaymentService } from './services-payment.service';
import { ServicePaymentRepository } from './repositories/service-payment.repository';
import { ServicesModule } from 'src/services/services.module';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';

@Module({
  imports: [ServicesModule, PaymentMethodModule],
  controllers: [ServicesPaymentController],
  providers: [ServicePaymentRepository, ServicesPaymentService]
})
export class ServicesPaymentModule { }
