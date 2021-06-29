import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false })
    username: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "varchar", nullable: false })
    firstName: string;

    @Column({ type: "varchar", nullable: false })
    lastName: string;

    @Column({ type: "boolean", default: false })
    isActive: boolean;

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @OneToMany(() => Order, (order) => order.user)
    public orders: Order[];
}

export const UserAdminResourceOption = {
    resource: User,
    options: {
        properties: {
            password: {
                isVisible: false,
            },
        },
    },
};
