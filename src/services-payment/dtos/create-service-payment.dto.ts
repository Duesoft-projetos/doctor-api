import { Expose, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ServicePaymentMethodDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsDecimal()
    @IsNotEmpty()
    value: number;
}

export class CreateServicePaymentDto {
    @IsDecimal()
    @IsOptional()
    discount?: number;

    @Expose({ name: 'service_id' })
    @IsNumber()
    @IsNotEmpty()
    serviceId: number;

    @Type(() => ServicePaymentMethodDto)
    @IsArray()
    @ArrayMinSize(1)
    methods: ServicePaymentMethodDto[];
}