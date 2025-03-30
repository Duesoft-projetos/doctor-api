import { Expose, Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsOptional, IsString, MinDate } from "class-validator";

export class CreateAppointmentDto {
    @Expose({ name: 'costumer_name' })
    @IsString()
    costumerName: string;

    @IsDateString()
    @Expose({ name: 'costumer_birthday' })
    costumerBirthday: string;

    @IsString()
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
    @MinDate(new Date())
    @Expose({ name: 'scheduled_time' })
    scheduledTime: Date;

    @IsString()
    @IsOptional()
    observation?: string;
}