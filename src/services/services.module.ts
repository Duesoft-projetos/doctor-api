import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentRepository } from 'src/appointments/repositories/appointments.repository';

import { ServiceRepository } from './repositories/services.repository';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [ConfigModule],
  controllers: [ServicesController],
  providers: [AppointmentRepository, ServiceRepository, ServicesService],
  exports: [ServicesService]
})
export class ServicesModule { }
