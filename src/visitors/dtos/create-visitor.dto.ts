import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVisitorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Expose({ name: 'type_id' })
    @IsNumber()
    @IsNotEmpty()
    typeId: number;

    @Expose({ name: 'professional_id' })
    @IsNumber()
    @IsNotEmpty()
    professionalId: number;
}