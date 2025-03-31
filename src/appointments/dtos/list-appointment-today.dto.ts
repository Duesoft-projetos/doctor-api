import { AppointmentStatus } from '@entities/appointments/appointment.entity';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListAppointmentDto {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @Expose({ name: 'costumer_name' })
  @IsString()
  @IsOptional()
  costumerName?: string;

  @Expose({ name: 'professional_id' })
  @Transform(({ value }) => (value ? Number.parseInt(value) : null))
  @IsNumber()
  @IsOptional()
  professionalId?: number;

  @Expose({ name: 'schedule_date' })
  @IsDateString()
  @IsOptional()
  scheduleDate?: string;
}
