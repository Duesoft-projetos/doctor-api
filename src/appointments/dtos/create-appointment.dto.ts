import { Expose, Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @Expose({ name: 'costumer_name' })
  @IsString()
  @IsNotEmpty()
  costumerName: string;

  @IsDateString()
  @IsNotEmpty()
  @Expose({ name: 'costumer_birthday' })
  costumerBirthday: string;

  @Transform(({ value }: { value: string }) => value.replace(/\D/g, ''))
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'costumer_phone' })
  costumerPhone: string;

  @IsNumber()
  @Expose({ name: 'medical_insurance_id' })
  medicalInsuranceId: number;

  @IsNumber()
  @Expose({ name: 'professional_id' })
  professionalId: number;

  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'scheduled_time' })
  scheduledTime: Date;

  @IsString()
  @IsOptional()
  observation?: string;
}
