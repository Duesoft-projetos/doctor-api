import { BaseEntity } from '@entities/base.entity';
import { Costumer } from '@entities/costumers/costumers.entity';
import { PaymentMethod } from '@entities/payment-method/payment-method.entity';
import { Professional } from '@entities/professional/professional.entity';
import { Service } from '@entities/services/services.entity';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export class ServicePaymentMethod {
  @Column()
  @ManyToOne(() => PaymentMethod)
  @JoinColumn()
  id: number;

  @Column({ type: 'decimal' })
  value: number;
}

@Entity({ name: 'service_payment' })
export class ServicePayment extends BaseEntity {
  @Column({ type: 'decimal', nullable: true })
  discount?: number;

  @Column({ type: 'decimal' })
  total: number;

  @Expose({ name: 'total_with_discount' })
  @Column({ name: 'total_with_discount', type: 'decimal' })
  totalWithDiscount: number;

  @Column({ name: 'professional_id' })
  professionalId: number;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @Column({ name: 'costumer_id' })
  costumerId: number;

  @ManyToOne(() => Costumer)
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

  @Column({ default: false })
  complimentary: boolean;

  @Column({ type: 'jsonb' })
  methods: ServicePaymentMethod[];
}
