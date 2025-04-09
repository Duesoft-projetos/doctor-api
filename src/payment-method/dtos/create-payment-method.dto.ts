import { PaymentMethodType } from "@entities/payment-method/payment-method-type";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @IsEnum(PaymentMethodType)
    type: PaymentMethodType;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Expose({ name: 'max_installments' })
    @IsNumber()
    @IsOptional()
    maxInstallments?: number;
}