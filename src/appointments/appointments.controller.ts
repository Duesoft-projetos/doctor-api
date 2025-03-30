import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Request } from 'express';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { ListAppointmentTodayDto } from './dtos/list-appointment-today.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly service: AppointmentsService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateAppointmentDto) {
        return await this.service.create(data, req.user);
    }

    @Get()
    async listToday(@Query() filter: ListAppointmentTodayDto) {
        return await this.service.listToday(filter);
    }
}
