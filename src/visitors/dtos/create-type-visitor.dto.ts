import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeVisitorDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}