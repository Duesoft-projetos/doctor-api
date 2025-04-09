import { BaseEntity } from '@entities/base.entity';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { PaymentMethodType } from './payment-method-type';

@Entity({ name: 'payment-method' })
export class PaymentMethod extends BaseEntity {
  @Column()
  description: string;

  @Column({ enum: PaymentMethodType })
  type: PaymentMethodType;

  @Expose({ name: 'max_installments' })
  @Column({ name: 'max_installments', nullable: true })
  maxInstallments?: number;
}
