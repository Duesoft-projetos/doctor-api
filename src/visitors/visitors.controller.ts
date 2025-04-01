import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { CreateTypeVisitorDto } from './dtos/create-type-visitor.dto';
import { Request } from 'express';

@Controller('visitors')
export class VisitorsController {
    constructor(private readonly service: VisitorsService) { }

    @Post('types')
    async createType(@Req() req: Request, @Body() data: CreateTypeVisitorDto) {
        return await this.service.createType(data, req.user);
    }

    @Get('types')
    async listTypes() {
        return await this.service.list();
    }
}
