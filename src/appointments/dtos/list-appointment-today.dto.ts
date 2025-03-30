import { Expose, Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ListAppointmentTodayDto {
    @Expose({ name: 'costumer_name' })
    @IsString()
    @IsOptional()
    costumerName?: string;

    @Expose({ name: 'professional_id' })
    @Transform(({ value }) => value ? Number.parseInt(value) : null)
    @IsNumber()
    @IsOptional()
    professionalId?: number;
}