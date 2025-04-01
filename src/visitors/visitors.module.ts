import { Module } from '@nestjs/common';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from '@entities/visitors/visitors.entity';
import { VisitorRepository } from './repositories/visitors.repository';
import { VisitorTypeRepository } from './repositories/visitor.type.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Visitor])],
  controllers: [VisitorsController],
  providers: [VisitorRepository, VisitorTypeRepository, VisitorsService]
})
export class VisitorsModule { }
