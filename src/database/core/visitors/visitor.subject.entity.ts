import { BaseEntity } from "@entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'visitor_types' })
export class VisitorType extends BaseEntity {
    @Column()
    description: string
}