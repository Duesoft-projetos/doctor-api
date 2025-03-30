import { Module } from '@nestjs/common';
import { MedicalInsuranceController } from './medical-insurance.controller';
import { MedicalInsuranceService } from './medical-insurance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInsurance } from '@entities/medical-insurance/medical-insurance.entity';
import { ConfigModule } from '@nestjs/config';
import { MedicalInsuranceRepository } from './medical-insurance.repostiory';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MedicalInsurance])],
  controllers: [MedicalInsuranceController],
  providers: [MedicalInsuranceRepository, MedicalInsuranceService]
})
export class MedicalInsuranceModule { }
