import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfessionalDto {
    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}