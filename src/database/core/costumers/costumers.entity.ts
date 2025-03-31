import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { Expose } from 'class-transformer';

export enum CostumerDocumentType {
    cpf = 'CPF',
    rg = 'RG',
}

export enum CostumerGender {
    male = 'MASCULINO',
    female = 'FEMININO',
}

@Entity({ name: 'costumers' })
export class Costumer extends BaseEntity {
    @Column({ nullable: true })
    document: string;

    @Column({ enum: CostumerDocumentType, nullable: true })
    documentType: CostumerDocumentType;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ type: 'date' })
    birthday: string;

    @Column({ enum: CostumerGender, nullable: true })
    gender?: CostumerGender;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    photo?: string;

    @Column({ name: 'legal_guardian', nullable: true })
    legalGuardian?: string;

    @Expose({ name: 'medical_insurance_id' })
    @Column({ name: 'medical_insurance_id', nullable: true })
    medicalInsuranceId?: number;

    @OneToOne(() => MedicalInsurance)
    @JoinColumn({ name: 'medical_insurance_id' })
    medicalInsurance?: MedicalInsurance;
}