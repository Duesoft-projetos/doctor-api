import { BaseEntity } from '@entities/base.entity';
import { Costumer } from '@entities/costumers/costumers.entity';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { Professional } from '@entities/professional/professional.entity';
import { ServicePayment } from '@entities/services-payment/service-payment.entity';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

export enum ServiceStatus {
  waiting = 'WAITING',
  read = 'READ-TO-SERVE',
  started = 'STARTED',
  pendingPayment = 'PENDING-PAYMENT',
  finished = 'FINISHED',
  finishedWithPayment = 'FINISHED-WITH-PAYMENT',
  finishedComplimentary = 'FINISHED-COMPLIMENTARY',
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

  @Expose({ name: 'finished_in' })
  @Column({ name: 'finished_in', nullable: true })
  finishedIn?: Date;

  @Column({ name: 'total', nullable: true })
  total?: number;

  @Column({ name: 'payment_id', nullable: true })
  paymentId?: number;

  @OneToOne(() => ServicePayment, { cascade: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment?: ServicePayment;
}
