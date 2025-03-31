import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @Expose({ name: 'professional_id' })
  @IsNumber()
  @IsNotEmpty()
  professionalId: number;

  @Expose({ name: 'scheduled_date' })
  @Type(() => Date)
  @IsDate()
  scheduledDate: Date;
}
