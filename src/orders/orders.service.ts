import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "src/common/entities/file.entity";
import { Order } from "src/common/entities/order.entity";
import { User } from "src/common/entities/user.entity";
import { OrderStatus } from "src/common/enums/orderStatuses.enum";
import { formatDatabaseDate } from "src/utils/formatDatabaseDate";
import { printFile } from "src/utils/printerWorker.util";
import { FindOperator, Repository } from "typeorm";
import * as dotenv from "dotenv";
import { UpdateOrderDto } from "./dto/update-order.dto";

dotenv.config();

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
    ) {}

    async createOrder(file: File): Promise<Order> {
        const execResult = await printFile(file.path, process.env.PRINTER_NAME);
        const regexp = new RegExp(process.env.PRINTER_NAME + "-\\d+");

        let match = regexp.exec(execResult);
        const task = Array.isArray(match) ? match[0] : null;

        const newOrder = await this.ordersRepository.save({
            createDate: new Date(),
            user: file.user,
            status: OrderStatus.Printed,
            pagesPrinted: 0,
            file: file,
            printerTaskName: task,
        });

        return newOrder;
    }

    async getOrdersByUser(
        user: User,
        formatDate: boolean = false,
    ): Promise<Order[]> {
        const ordersList = await this.ordersRepository.find({
            where: { user },
            relations: ["file"],
        });

        if (!formatDate) return ordersList;

        return this.formatFilesDate(ordersList) as any;
    }

    async getOrdersByPrinterTasks(
        tasks: string[],
        formatDate: boolean = false,
    ) {
        if (tasks.length < 1) return [];

        const ordersList = await this.ordersRepository.find({
            relations: ["file", "user"],
            where: tasks
                .map((task) => "Order.printerTaskName LIKE '%" + task + "%'")
                .join(" OR "),
        });

        if (!formatDate) return ordersList;

        return this.formatFilesDate(ordersList) as any;
    }

    async getOrderById(orderID: number): Promise<Order> {
        const order = await this.ordersRepository.findOne(orderID, {
            relations: ["user", "file"],
        });

        return order;
    }

    async getAllOrders(formatDate: boolean = false): Promise<Order[]> {
        const ordersList = await this.ordersRepository.find({
            relations: ["file", "user"],
        });

        if (!formatDate) return ordersList;

        return this.formatFilesDate(ordersList) as any;
    }

    async updateOrder(
        orderId: number,
        updateUserDto: UpdateOrderDto,
    ): Promise<any> {
        const updatedUser = await this.ordersRepository.update(
            {
                id: orderId,
            },
            updateUserDto,
        );

        return await this.getOrderById(orderId);
    }

    formatFilesDate(ordersList: Order[]) {
        return ordersList.map((order) => {
            return {
                ...order,
                createDate: formatDatabaseDate(order.createDate),
            };
        });
    }
}
