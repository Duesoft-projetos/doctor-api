import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';

@Controller('payment-methods')
export class PaymentMethodController {
    constructor(private readonly service: PaymentMethodService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreatePaymentMethodDto) {
        return await this.service.create(data, req.user);
    }

    @Get()
    async list() {
        return await this.service.list();
    }
}
