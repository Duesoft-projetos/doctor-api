import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateServiceDto {
  @Expose({ name: 'costumer_id' })
  @IsNumber()
  @IsNotEmpty()
  costumerId: number;

  @Expose({ name: 'medical_insurance_id' })
  @IsNumber()
  @IsNotEmpty()
  medicalInsuranceId: number;

  @Expose({ name: 'professional_id' })
  @IsNumber()
  @IsNotEmpty()
  professionalId: number;

  @Expose({ name: 'scheduled_start' })
  @Type(() => Date)
  @IsDate()
  scheduledStart: Date;

  @Expose({ name: 'scheduled_end' })
  @Type(() => Date)
  @IsDate()
  scheduledEnd: Date;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  observation?: string;
}
