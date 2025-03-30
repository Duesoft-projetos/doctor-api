import { User } from '@entities/users/users.entity';
import { PickType } from '@nestjs/swagger';
import * as _ from 'lodash';

const payloadFields = ['id', 'email', 'name', 'roles', 'photo', 'isAdmin', 'isActive'] as Array<
    keyof User
>;

export type TokenType = 'access' | 'refresh';

export class Payload extends PickType(User, payloadFields) {
    constructor(user: User) {
        super();

        payloadFields.forEach((key) => {
            const value = _.get(user, key);
            if (value) Object.assign(this, { [key]: value });
        });
    }
}