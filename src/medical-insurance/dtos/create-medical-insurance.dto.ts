import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateMedicalInsuranceDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
        message: 'O CNPJ deve estar no formato 99.999.999/0001-99 ou 99999999000199'
    })
    @Transform(({ value }: { value: string }) => value.replace(/\D/g, ''))
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}