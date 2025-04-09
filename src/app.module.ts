import settings from '@config/api.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { CostumerModule } from './costumer/costumer.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './guards/auth.guard';
import { UserRolesGuard } from './guards/user-roles.guard';
import { JwtModuleInternal } from './jwt/jwt.module';
import { MedicalInsuranceModule } from './medical-insurance/medical-insurance.module';
import { ProfessionalModule } from './professional/professional.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { VisitorsModule } from './visitors/visitors.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      load: [settings],
    }),
    DatabaseModule,
    JwtModuleInternal,
    AuthModule,
    UsersModule,
    CostumerModule,
    MedicalInsuranceModule,
    ProfessionalModule,
    AppointmentsModule,
    ServicesModule,
    VisitorsModule,
    PaymentMethodModule,
  ],
  providers: [
    { provide: 'APP_GUARD', useClass: AuthGuard },
    { provide: 'APP_GUARD', useClass: UserRolesGuard },
  ],
})
export class AppModule { }
