import { UserRoles } from '@entities/users/users.roles';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRoles[]>();