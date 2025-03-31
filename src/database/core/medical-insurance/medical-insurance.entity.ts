import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'medical_insurance' })
export class MedicalInsurance extends BaseEntity {
    @Column({ unique: true, nullable: true })
    cnpj?: string;

    @Column()
    name: string;

    @Expose({ name: 'generate_charge' })
    @Column({ name: 'generate_charge', default: false })
    generateCharge: boolean;
}