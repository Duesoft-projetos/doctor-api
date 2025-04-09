import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FinishServiceDto {
    @Transform(({ value }: { value: string }) => !isNaN(Number(value)) ? Number.parseInt(value, 10) : value)
    @IsNumber()
    @IsNotEmpty()
    id: number;
}