import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import settings from '@config/api.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { JwtModuleInternal } from './jwt/jwt.module';
import { CostumerModule } from './costumer/costumer.module';
import { MedicalInsuranceModule } from './medical-insurance/medical-insurance.module';
import { AuthGuard } from './guards/auth.guard';
import { UserRolesGuard } from './guards/user-roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [settings],
    }),
    DatabaseModule,
    JwtModuleInternal,
    AuthModule,
    UsersModule,
    CostumerModule,
    MedicalInsuranceModule,
  ],
  providers: [
    { provide: 'APP_GUARD', useClass: AuthGuard },
    { provide: 'APP_GUARD', useClass: UserRolesGuard },
  ],
})
export class AppModule { }
