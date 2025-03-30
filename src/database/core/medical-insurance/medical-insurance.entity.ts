import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';

@Entity({ name: 'medical_insurance' })
export class MedicalInsurance extends BaseEntity {
    @Column({ unique: true })
    cnpj: string;

    @Column()
    name: string;
}