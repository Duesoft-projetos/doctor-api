import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { ServicesPaymentService } from './services-payment.service';
import { Request } from 'express';
import { CreateServicePaymentDto } from './dtos/create-service-payment.dto';
import { FilterServicePaymentDto } from './dtos/filter-service-payment.dto';
import { format } from 'date-fns';

@Controller('services/payment')
export class ServicesPaymentController {
    constructor(private readonly service: ServicesPaymentService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateServicePaymentDto) {
        return await this.service.create(data, req.user);
    }

    @Get(':id')
    async findByService(@Param('id', ParseIntPipe) serviceId: number) {
        return await this.service.findByService(serviceId);
    }

    @Get('today')
    async listToday(@Query() query: FilterServicePaymentDto) {
        query.startDate = query.startDate || format(new Date(), 'yyyy-MM-dd');
        query.endDate = query.endDate || format(new Date(), 'yyyy-MM-dd');

        return await this.service.list(query);
    }
}
