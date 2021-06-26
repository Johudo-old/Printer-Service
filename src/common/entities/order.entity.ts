import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Order {
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
}
