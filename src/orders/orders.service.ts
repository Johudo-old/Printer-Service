import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/common/entities/order.entity";
import { User } from "src/common/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
    ) {}

    async createOrder(file: any, user: User): Promise<Order> {
        const newOrder = await this.ordersRepository.save({
            originalName: file.originalname,
            path: file.destination + "/" + file.filename,
            createDate: new Date(),
            user: user,
        });

        return newOrder;
    }

    async getOrdersByUserId(user: User): Promise<Order[]> {
        const ordersList = await this.ordersRepository.find({ user });
        return ordersList;
    }
}
