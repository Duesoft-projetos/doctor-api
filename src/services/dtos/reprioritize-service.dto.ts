import { Type } from "class-transformer";
import { ArrayMinSize, IsArray } from "class-validator";

export class ReprioritizeServicesDto {
    @Type(() => Array<Number>)
    @IsArray()
    @ArrayMinSize(2)
    ids: number[];
}