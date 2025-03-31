import { ServiceStatus } from '@entities/services/services.entity';
import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class ListServiceDto {
  @IsArray()
  @IsOptional()
  status?: ServiceStatus[];

  @Expose({ name: 'costumer_id' })
  @IsNumber()
  @IsOptional()
  costumerId?: number;

  @Expose({ name: 'professional_id' })
  @IsNumber()
  @IsOptional()
  professionalId?: number;

  @Expose({ name: 'schedule_date' })
  @IsDateString()
  @IsOptional()
  scheduleDate?: string;
}
