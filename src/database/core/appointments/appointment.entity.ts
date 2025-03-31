import { BaseEntity } from '@entities/base.entity';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { Professional } from '@entities/professional/professional.entity';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AppointmentReasonCancellation } from './appointments.reason.cancellation.entity';

export enum AppointmentStatus {
  active = 'ACTIVE',
  waiting = 'WAITING',
  canceled = 'CANCELED',
  invalid = 'INVALID',
}

@Entity({ name: 'appointments' })
export class Appointment extends BaseEntity {
  @Column({ enum: AppointmentStatus, default: AppointmentStatus.active })
  status: AppointmentStatus;

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

  @Expose({ name: 'reason_cancellation_id' })
  @Column({ name: 'reason_cancellation_id', nullable: true })
  reasonCancellationId?: number;

  @Expose({ name: 'reason_cancellation' })
  @ManyToOne(() => AppointmentReasonCancellation)
  @JoinColumn({ name: 'reason_cancellation_id' })
  reasonCancellation?: AppointmentReasonCancellation;

  @Expose({ name: 'description_cancellation' })
  @Column({ name: 'description_cancellation', nullable: true })
  descriptionCancellation?: string;
}
