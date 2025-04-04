import { BaseEntity } from '@entities/base.entity';
import { Costumer } from '@entities/costumers/costumers.entity';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { Professional } from '@entities/professional/professional.entity';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum ServiceStatus {
  waiting = 'WAITING',
  read = 'READ-TO-SERVE',
  started = 'STARTED',
  finished = 'FINISHED',
  canceled = 'CANCELED',
}

@Entity({ name: 'services' })
export class Service extends BaseEntity {
  @Column({ enum: ServiceStatus, default: ServiceStatus.waiting })
  status: ServiceStatus;

  @Expose({ name: 'costumer_id' })
  @Column({ name: 'costumer_id' })
  costumerId: number;

  @ManyToOne(() => Costumer)
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

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

  @Expose({ name: 'office_key' })
  @Column({ name: 'office_key', nullable: true })
  officeKey: string;

  @Column({ nullable: true })
  priority?: number;

  @Expose({ name: 'started_in' })
  @Column({ name: 'started_in', nullable: true })
  startedIn?: Date;
}
