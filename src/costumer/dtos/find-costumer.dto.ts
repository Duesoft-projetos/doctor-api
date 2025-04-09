import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class FindCostumerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    birthday: string;
}