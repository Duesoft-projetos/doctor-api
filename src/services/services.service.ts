import { Service } from '@entities/services/services.entity';
import { User } from '@entities/users/users.entity';
import { Injectable } from '@nestjs/common';

import { CreateServiceDto } from './dtos/create-service.dto';
import { ListServiceDto } from './dtos/list-service.dto';
import { ServiceRepository } from './repositories/services.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServiceRepository) { }

  async create(data: CreateServiceDto, user: User): Promise<Service> {
    const register = this.repository.create(data);
    register.userId = user.id;

    await this.repository.save(register);
    return register;
  }

  async list(data: ListServiceDto): Promise<Service[]> {
    const registers = await this.repository.list(data);

    return registers;
  }
}
