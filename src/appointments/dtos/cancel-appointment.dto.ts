import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CancelAppointmentDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @Expose({ name: 'reason_cancellation' })
    @IsString()
    @IsNotEmpty()
    reasonCancellation: string;
}