import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Serving {
    @Transform(({ value }: { value: string }) => !isNaN(Number(value)) ? Number.parseInt(value) : null)
    @IsNumber()
    @IsNotEmpty()
    id: number;
}