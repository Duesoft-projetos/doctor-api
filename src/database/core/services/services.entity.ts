import { BaseEntity } from '@entities/base.entity';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

export enum ServiceStatus {
  waiting = 'WAITING',
  started = 'STARTED',
  canceled = 'CANCELED',
}

@Entity({ name: 'services' })
export class Service extends BaseEntity {
  @Column({ enum: ServiceStatus, default: ServiceStatus.waiting })
  status: ServiceStatus;

  @Expose({ name: 'costumer_id' })
  @Column({ name: 'costumer_id' })
  costumerId: number;

  @Expose({ name: 'medical_insurance_id' })
  @Column({ name: 'medical_insurance_id' })
  medicalInsuranceId: number;

  @Expose({ name: 'professional_id' })
  @Column({ name: 'professional_id' })
  professionalId: number;

  @Expose({ name: 'scheduled_start' })
  @Column({ name: 'scheduled_start' })
  scheduledStart: Date;

  @Expose({ name: 'scheduled_end' })
  @Column({ name: 'scheduled_end' })
  scheduledEnd: Date;

  @Column({ nullable: true })
  observation?: string;
}
