import { BaseEntity } from "@entities/base.entity";
import { MedicalInsurance } from "@entities/medical-insurance/medical-insurance.entity";
import { Professional } from "@entities/professional/professional.entity";
import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity({ name: 'appointments' })
export class Appointment extends BaseEntity {
    @Expose({ name: 'costumer_name' })
    @Column({ name: 'costumer_name' })
    costumerName: string;

    @Expose({ name: 'costumer_birthday' })
    @Column({ name: 'costumer_birthday' })
    costumerBirthday: string;

    @Expose({ name: 'costumer_phone' })
    @Column({ name: 'costumer_phone' })
    costumerPhone: string;

    @Expose({ name: 'medical_insurance_id' })
    @Column({ name: 'medical_insurance_id' })
    medicalInsuranceId: number;

    @Expose({ name: 'medical_insurance' })
    @ManyToOne(() => MedicalInsurance)
    @JoinColumn({ name: 'medical_insurance_id' })
    medicalInsurance: MedicalInsurance;

    @Expose({ name: 'professional_id' })
    @Column({ name: 'professional_id' })
    professionalId: number;

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional: Professional;

    @Expose({ name: 'scheduled_start' })
    @Column({ name: 'scheduled_start' })
    scheduledStart: Date;

    @Expose({ name: 'scheduled_end' })
    @Column({ name: 'scheduled_end' })
    scheduledEnd: Date;

    @Column({ nullable: true })
    observation?: string;
}