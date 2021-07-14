import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotAcceptableException,
    NotFoundException,
    Param,
    Request,
    UseGuards,
} from "@nestjs/common";
import { Order } from "src/common/entities/order.entity";
import { OrderStatus } from "src/common/enums/orderStatuses.enum";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";
import { FindByIdParams } from "src/utils/findByIdParams";
import { cancelPrintFile } from "src/utils/printerWorker.util";
import { OrdersService } from "./orders.service";

@Controller("api/orders")
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @UseGuards(AuthenticatedGuard)
    @Get(":id/cancel")
    @HttpCode(HttpStatus.OK)
    async printFile(
        @Param() { id }: FindByIdParams,
        @Request() req,
    ): Promise<void> {
        if (isNaN(Number(id))) return;

        const order = await this.orderService.getOrderById(Number(id));

        if (order.status === OrderStatus.Canceled) return;

        if (!order) throw new NotFoundException();

        if (!(req.user.id === order.user.id || req.user.isAdmin))
            throw new NotAcceptableException();

        const printer = order.printerTaskName.substr(
            0,
            order.printerTaskName.lastIndexOf("-"),
        );
        const taskID = order.printerTaskName.substr(
            order.printerTaskName.lastIndexOf("-") + 1,
        );

        cancelPrintFile(taskID, printer);

        this.orderService.updateOrder(order.id, {
            status: OrderStatus.Canceled,
        });

        return;
    }
}
