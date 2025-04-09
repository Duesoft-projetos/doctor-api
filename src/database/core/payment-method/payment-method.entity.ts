import { BaseEntity } from "@entities/base.entity";
import { Column, Entity } from "typeorm";
import { PaymentMethodType } from "./payment-method-type";
import { Expose } from "class-transformer";

@Entity({ name: 'payment-method' })
export class PaymentMethod extends BaseEntity {
    @Column()
    description: string;

    @Column({ enum: PaymentMethodType })
    type: string;

    @Expose({ name: 'max_installments' })
    @Column({ name: 'max_installments', nullable: true })
    maxInstallments?: number;
}