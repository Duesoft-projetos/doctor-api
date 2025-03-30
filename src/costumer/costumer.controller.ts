import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { Request } from 'express';
import { CreateCostumerDto } from './dtos/create-costumer.dto';

@Controller('costumers')
export class CostumerController {
    constructor(private readonly service: CostumerService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateCostumerDto) {
        return this.service.create(data, req.user);
    }

    @Get()
    async listAll() {
        return this.service.list();
    }
}
