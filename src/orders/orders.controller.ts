import { Controller } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("api/orders")
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}
}
