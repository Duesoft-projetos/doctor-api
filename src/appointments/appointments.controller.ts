import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Request } from 'express';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { ListAppointmentDto } from './dtos/list-appointment-today.dto';
import { format } from 'date-fns';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly service: AppointmentsService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateAppointmentDto) {
        return await this.service.create(data, req.user);
    }

    @Get('today')
    async listToday(@Query() filter: ListAppointmentDto) {
        filter.scheduleDate = format(new Date(), "yyyy-MM-dd");

        return await this.service.list(filter);
    }

    @Get()
    async list(@Query() filter: ListAppointmentDto) {
        return await this.service.list(filter);
    }

    @Get(':id/details')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findById(id);
    }
}
