import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

    async getOrdersByUserId(
        user: User,
        formatDate: boolean = false,
    ): Promise<Order[]> {
        const ordersList = await this.ordersRepository.find({ user });

        if (!formatDate) return ordersList;

        let orders: any = ordersList;

        orders = orders.map((order) => {
            return {
                ...order,
                createDate: order.createDate.toLocaleString("ru-RU"),
            };
        });

        return orders;
    }

    async getAllOrders(formatDate: boolean = false): Promise<Order[]> {
        const ordersList = await this.ordersRepository.find({
            relations: ["user"],
        });

        if (!formatDate) return ordersList;

        let orders: any = ordersList;

        orders = orders.map((order) => {
            return {
                ...order,
                createDate: order.createDate.toLocaleString("ru-RU"),
            };
        });

        return orders;
    }

    async getOrderById(orderID: number): Promise<Order> {
        const order = await this.ordersRepository.findOne(orderID);

        if (!order)
            throw new HttpException(
                { message: "This order was not found" },
                HttpStatus.NO_CONTENT,
            );

        return order;
    }
}
