import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RescheduleAppointmentDto {
  @Expose({ name: 'professional_id' })
  @IsNumber()
  @IsNotEmpty()
  professionalId: number;

  @Expose({ name: 'scheduled_time' })
  @Type(() => Date)
  @IsDate()
  scheduledTime: Date;
}
