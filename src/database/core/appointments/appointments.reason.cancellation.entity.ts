import { BaseEntity } from '@entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'appointment_reason_cancellation' })
export class AppointmentReasonCancellation extends BaseEntity {
  @Column()
  description: string;
}
