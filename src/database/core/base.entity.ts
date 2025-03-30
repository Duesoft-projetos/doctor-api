import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './users/users.entity';

export class BaseEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Exclude()
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    readonly createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    readonly updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt!: Date;

    @Exclude()
    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Exclude()
    @Column({ name: 'user_id', nullable: true })
    userId?: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user?: User;
}