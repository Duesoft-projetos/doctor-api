import { ServiceStatus } from '@entities/services/services.entity';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { format } from 'date-fns';
import { Request } from 'express';

import { CreateServiceDto } from './dtos/create-service.dto';
import { ListServiceDto } from './dtos/list-service.dto';
import { ReadToServeService } from './dtos/read-to-serve-service.dto';
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

  @Get('today/:status')
  async listToday(@Param('status') status: string, @Query() query: ListServiceDto) {
    switch (status) {
      case 'waiting':
        query.status = [ServiceStatus.waiting, ServiceStatus.read];
        break;

      case 'started':
        query.status = [ServiceStatus.started];
        break;

      case 'finished':
        query.status = [ServiceStatus.finished];
        break;

      default:
        break;
    }

    query.scheduleDate = format(new Date(), 'yyyy-MM-dd');

    return await this.service.list(query);
  }

  @Put(':id/ready')
  async readyToServe(@Param('id', ParseIntPipe) id: number, @Body() data: ReadToServeService) {
    return await this.service.readyToServe({ ...data, id });
  }
}
