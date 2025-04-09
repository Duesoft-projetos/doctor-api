import { BaseEntity } from "@entities/base.entity";
import { Costumer } from "@entities/costumers/costumers.entity";
import { PaymentMethod } from "@entities/payment-method/payment-method.entity";
import { Professional } from "@entities/professional/professional.entity";
import { Service } from "@entities/services/services.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export class ServicePaymentMethod {
    @Column()
    @ManyToOne(() => PaymentMethod)
    @JoinColumn()
    id: number;

    @Column()
    value: number;
}

@Entity({ name: 'service_payment' })
export class ServicePayment extends BaseEntity {
    @Column({ nullable: true })
    discount?: number;

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

    @Column({ name: 'service_id' })
    serviceId: number;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Column({ default: false })
    complimentary: boolean;

    @Column({ type: 'jsonb' })
    methods: ServicePaymentMethod[];
}