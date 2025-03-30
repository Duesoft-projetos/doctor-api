import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserRoles } from './users.roles';
import { BaseEntity } from '@entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ nullable: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ nullable: true })
    photo?: string;

    @Column({ type: 'enum', enum: UserRoles, array: true, nullable: true })
    roles: UserRoles[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}