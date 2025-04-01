import { VisitorStatus } from "@entities/visitors/visitors.entity";
import { Expose } from "class-transformer";
import { IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";

export class ListVisitorDto {
    @IsDateString()
    @IsOptional()
    scheduledDate?: string;

    @IsEnum(VisitorStatus)
    @IsOptional()
    status?: VisitorStatus;

    @Expose({ name: 'professional_id' })
    @IsNumber()
    @IsOptional()
    professionalId: number;
}