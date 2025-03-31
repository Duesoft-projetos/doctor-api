import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { format } from 'date-fns';
import { Request } from 'express';

import { AppointmentsService } from './appointments.service';
import { CancelAppointmentDto } from './dtos/cancel-appointment.dto';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { CreateReasonCancellationAppointment } from './dtos/create-reason-cancellation-appointment.dto';
import { ListAppointmentDto } from './dtos/list-appointment-today.dto';
import { RescheduleAppointmentDto } from './dtos/reschedule-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post('reason-cancellation')
  async createReasonCancellation(
    @Req() req: Request,
    @Body() data: CreateReasonCancellationAppointment,
  ) {
    return await this.service.createReasonCancellation(data, req.user);
  }

  @Get('reason-cancellation')
  async listReasonCancellation() {
    return await this.service.listReasonCancellation();
  }

  @Post()
  async create(@Req() req: Request, @Body() data: CreateAppointmentDto) {
    return await this.service.create(data, req.user);
  }

  @Get('today')
  async listToday(@Query() filter: ListAppointmentDto) {
    filter.scheduleDate = format(new Date(), 'yyyy-MM-dd');

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

  @Post(':id/cancel')
  async cancelById(@Param('id', ParseIntPipe) id: number, @Body() data: CancelAppointmentDto) {
    return await this.service.cancelById({ ...data, id });
  }

  @Put(':id/reschedule')
  async rescheduleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RescheduleAppointmentDto,
  ) {
    return await this.service.rescheduleById({ ...data, id });
  }
}
