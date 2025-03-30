import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';

@Entity({ name: 'professional' })
export class Professional extends BaseEntity {
    @Column({ nullable: true })
    document: string;

    @Column()
    name: string;
}