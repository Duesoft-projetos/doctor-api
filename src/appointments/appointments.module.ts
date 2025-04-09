import { Appointment } from '@entities/appointments/appointment.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentReasonCancellationRepository } from './repositories/appointments.reason.cancellation.repository';
import { AppointmentRepository } from './repositories/appointments.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentRepository, AppointmentReasonCancellationRepository, AppointmentsService],
  exports: [AppointmentRepository]
})
export class AppointmentsModule { }
