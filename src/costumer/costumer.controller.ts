import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { Request } from 'express';
import { CreateCostumerDto } from './dtos/create-costumer.dto';
import { FindCostumerDto } from './dtos/find-costumer.dto';

@Controller('costumers')
export class CostumerController {
    constructor(private readonly service: CostumerService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateCostumerDto) {
        return this.service.create(data, req.user);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: CreateCostumerDto) {
        return this.service.update(id, data);
    }

    @Get()
    async listAll() {
        return this.service.list();
    }

    @Get(':name/:birthday')
    async find(@Param() params: FindCostumerDto) {
        return await this.service.find(params);
    }
}
