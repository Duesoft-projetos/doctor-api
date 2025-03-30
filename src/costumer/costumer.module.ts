import { Module } from '@nestjs/common';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costumer } from '@entities/costumers/costumers.entity';
import { ConfigModule } from '@nestjs/config';
import { CostumerRepository } from './costumer.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Costumer])],
  controllers: [CostumerController],
  providers: [CostumerRepository, CostumerService]
})
export class CostumerModule { }
