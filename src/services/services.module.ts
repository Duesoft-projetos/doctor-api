import { Service } from '@entities/services/services.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from 'src/appointments/repositories/appointments.repository';

import { ServiceRepository } from './repositories/services.repository';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [AppointmentRepository, ServiceRepository, ServicesService],
})
export class ServicesModule {}
