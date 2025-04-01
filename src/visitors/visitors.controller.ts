import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { CreateTypeVisitorDto } from './dtos/create-type-visitor.dto';
import { Request } from 'express';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { ListVisitorDto } from './dtos/list-visitor.dto';
import { format } from 'date-fns';

@Controller('visitors')
export class VisitorsController {
    constructor(private readonly service: VisitorsService) { }

    @Post('types')
    async createType(@Req() req: Request, @Body() data: CreateTypeVisitorDto) {
        return await this.service.createType(data, req.user);
    }

    @Get('types')
    async listTypes() {
        return await this.service.listTypes();
    }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateVisitorDto) {
        return await this.service.create(data, req.user);
    }

    @Get()
    async list(@Query() query: ListVisitorDto) {
        return await this.service.list(query);
    }

    @Get('today')
    async listToday(@Query() query: ListVisitorDto) {
        query.scheduledDate = format(new Date(), 'yyyy-MM-dd')
        return await this.service.list(query);
    }

    @Put(':id/serve')
    async serveVisitor(@Param('id', ParseIntPipe) id: number) {
        return await this.service.serve(id);
    }
}
