import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
} from "typeorm";
import { Order } from "./order.entity";
import { User } from "./user.entity";

@Entity()
export class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    originalName: string;

    @Column({ type: "varchar", nullable: false })
    path: string;

    @Column({ type: "timestamp", nullable: false })
    createDate: Date;

    @Column({ type: "int", nullable: false })
    pages: number;

    @ManyToOne(() => User, (user) => user.files)
    user: User;

    @RelationId((order: File) => order.user)
    userId: number;

    @OneToMany(() => Order, (order) => order.file)
    orders: Order[];
}

export const FileAdminResourceOption = {
    resource: File,
};
