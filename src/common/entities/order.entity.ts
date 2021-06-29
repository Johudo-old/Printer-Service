import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    originalName: string;

    @Column({ type: "varchar", nullable: false })
    path: string;

    @Column({ type: "timestamp", nullable: false })
    createDate: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @RelationId((order: Order) => order.user)
    userId: number;
}

export const OrderAdminResourceOption = {
    resource: Order,
};
