import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import settings from '@config/api.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { JwtModuleInternal } from './jwt/jwt.module';

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
  ],
})
export class AppModule { }
