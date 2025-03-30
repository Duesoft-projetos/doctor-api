import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Request } from 'express';
import { CreateProfessionalDto } from './dtos/create-professional.dto';

@Controller('professionals')
export class ProfessionalController {
    constructor(private readonly service: ProfessionalService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateProfessionalDto) {
        return await this.service.create(data, req.user);
    }

    @Get()
    async listAll() {
        return await this.service.list();
    }
}
