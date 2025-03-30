import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from '@entities/professional/professional.entity';
import { ProfessionalRepository } from './professional.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalController],
  providers: [ProfessionalRepository, ProfessionalService]
})
export class ProfessionalModule { }
