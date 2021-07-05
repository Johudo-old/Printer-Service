import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "src/common/entities/file.entity";
import { Order } from "src/common/entities/order.entity";
import { User } from "src/common/entities/user.entity";
import { OrderStatus } from "src/common/enums/orderStatuses.enum";
import { formatDatabaseDate } from "src/utils/formatDatabaseDate";
import { printFile } from "src/utils/printerWorker.util";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
    ) {}

    async createOrder(file: File): Promise<Order> {
        const newOrder = await this.ordersRepository.save({
            createDate: new Date(),
            user: file.user,
            status: OrderStatus.Printing,
            pagesPrinted: 0,
            file: file,
        });

        printFile(newOrder.file.path);

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

    formatFilesDate(ordersList: Order[]) {
        return ordersList.map((order) => {
            return {
                ...order,
                createDate: formatDatabaseDate(order.createDate),
            };
        });
    }
}
