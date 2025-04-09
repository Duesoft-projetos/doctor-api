import { Expose, Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ServicePaymentMethodDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}

export class CreateServicePaymentDto {
  @Transform(({ value }) => Number.parseFloat(value.toString()))
  @IsNumber()
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
