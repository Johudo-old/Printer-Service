import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
} from "typeorm";
import { OrderStatus } from "../enums/orderStatuses.enum";
import { File } from "./file.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", nullable: false })
    createDate: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @RelationId((order: Order) => order.user)
    userId: number;

    // 0 - ожидание печати
    // 1 - напечатано
    // 2 - отменено
    @Column({
        type: "char",
        default: OrderStatus.Printing,
        nullable: false,
    })
    status: number;

    @Column({ type: "int", nullable: false })
    pagesPrinted: number;

    @ManyToOne(() => File, (file) => file.orders)
    file: File;

    @RelationId((file: File) => file.user)
    fileId: number;
}

export const OrderAdminResourceOption = {
    resource: Order,
};
