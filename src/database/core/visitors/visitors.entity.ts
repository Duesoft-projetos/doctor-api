import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { VisitorType } from "./visitor.subject.entity";
import { Professional } from "@entities/professional/professional.entity";
import { BaseEntity } from "@entities/base.entity";

export enum VisitorStatus {
    waiting = 'WAITING',
    served = 'SERVED'
}

@Entity({ name: 'visitors' })
export class Visitor extends BaseEntity {
    @Column()
    name: string;

    @Expose({ name: 'type_id' })
    @Column({ name: 'type_id' })
    typeId: number;

    @ManyToOne(() => VisitorType)
    @JoinColumn({ name: 'type_id' })
    type: VisitorType;

    @Expose({ name: 'professional_id' })
    @Column({ name: 'professional_id' })
    professionalId: number;

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional: Professional;

    @Column({ enum: VisitorStatus, default: VisitorStatus.waiting })
    status: VisitorStatus;
}