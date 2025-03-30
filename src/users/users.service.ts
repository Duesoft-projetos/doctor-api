import { User } from '@entities/users/users.entity';
import { UserRoles } from '@entities/users/users.roles';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payload } from 'src/jwt/jwt.dto';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly configService: ConfigService,
        private readonly repository: UserRepository
    ) { }

    validDevice(deviceId: string): boolean {
        const deviceAuthorized = this.configService.get<string>('APP_DEVICE_ID');

        return !!deviceId && !!deviceAuthorized && deviceAuthorized == deviceId;
    }

    async find(email: string): Promise<User | null> {
        const user = await this.repository.findByEmail(email);
        return user;
    }

    async createAdmin(data: CreateUserDto): Promise<User> {
        let register = await this.repository.findByEmail(data.email);

        if (register) {
            throw new ConflictException(`O e-mail ${register.email} já existe`);
        }

        register = this.repository.create(data);
        register.roles = [UserRoles.admin];
        return await this.repository.save(register);
    }

    async create(data: CreateUserDto, user: Payload): Promise<User> {
        const { email } = data;

        let register = await this.repository.findByEmail(email);

        if (register) {
            throw new ConflictException(`O e-mail ${register.email} já existe`);
        }

        register = this.repository.create(data);
        register.userId = user.id;
        register.roles = [UserRoles.receptionist];
        return await this.repository.save(register);
    }
}