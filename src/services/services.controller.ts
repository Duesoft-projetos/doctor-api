import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { format } from 'date-fns';
import { Request } from 'express';

import { CreateServiceDto } from './dtos/create-service.dto';
import { ListServiceDto } from './dtos/list-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Post()
  async create(@Req() req: Request, @Body() data: CreateServiceDto) {
    return await this.service.create(data, req.user);
  }

  @Get()
  async list(@Param() params: ListServiceDto) {
    return await this.service.list(params);
  }

  @Get('today')
  async listToday(@Param() params: ListServiceDto) {
    params.scheduleDate = format(new Date(), 'yyyy-MM-dd');
    return await this.service.list(params);
  }
}
