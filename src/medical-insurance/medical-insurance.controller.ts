import { Body, Controller, Post, Req } from '@nestjs/common';
import { MedicalInsuranceService } from './medical-insurance.service';
import { Request } from 'express';
import { CreateMedicalInsuranceDto } from './dtos/create-medical-insurance.dto';

@Controller('medical-insurance')
export class MedicalInsuranceController {
    constructor(private readonly service: MedicalInsuranceService) { }

    @Post()
    async create(@Req() req: Request, @Body() data: CreateMedicalInsuranceDto) {
        return this.service.create(data, req.user);
    }
}
