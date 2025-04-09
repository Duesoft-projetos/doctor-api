import { Expose } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";

export class FilterServicePaymentDto {
    @Expose({ name: 'start_date' })
    @IsDateString()
    @IsOptional()
    startDate: string;

    @Expose({ name: 'end_date' })
    @IsDateString()
    @IsOptional()
    endDate: string;
}