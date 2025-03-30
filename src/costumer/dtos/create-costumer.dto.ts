import { CostumerDocumentType, CostumerGender } from "@entities/costumers/costumers.entity";
import { Expose, Transform } from "class-transformer";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCostumerDto {
    @Transform(({ value }: { value: string }) => value.replace(/\D/g, ''))
    @IsString()
    @IsOptional()
    document?: string;

    @IsEnum(CostumerDocumentType)
    @IsOptional()
    documentType?: CostumerDocumentType;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsDateString()
    birthday: string;

    @IsEnum(CostumerGender)
    gender: CostumerGender;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    observation?: string;

    @IsNumber()
    @Expose({ name: 'medical_insurance_id' })
    medicalInsuranceId: number;
}