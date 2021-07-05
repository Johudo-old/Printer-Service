import {
    Controller,
    Get,
    Render,
    Request,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Order } from "./common/entities/order.entity";
import { OrderStatus } from "./common/enums/orderStatuses.enum";
import { AuthExceptionFilter } from "./common/filters/auth-exceptions.filter";
import { AuthenticatedGuard } from "./common/guards/authenticated.guard";
import { IsNotAuthenticatedGuard } from "./common/guards/inNotAuthenticated.guard";
import { FilesService } from "./files/files.service";
import { OrdersService } from "./orders/orders.service";
import { UsersService } from "./users/users.service";

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly ordersService: OrdersService,
        private readonly filesService: FilesService,
        private readonly userService: UsersService,
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get("/")
    @Render("account")
    async account(@Request() req) {
        const user = await this.userService.getUserById(req.user.id);
        let files: Array<any> = await this.filesService.getFilesByUserId(
            user,
            true,
        );
        let orders: Array<any> = await this.ordersService.getOrdersByUser(
            user,
            true,
        );

        orders = orders.map((order: Order) => {
            const status = Number(order.status);
            const pagesPrinted =
                status === OrderStatus.Printing ? "Н\\А" : order.pagesPrinted;

            let statusText = String(status);

            switch (status) {
                case OrderStatus.Printing:
                    statusText = "Отправлено на печать";
                    break;
                case OrderStatus.Printed:
                    statusText = "Напечатано";
                    break;
                case OrderStatus.Canceled:
                    statusText = "Отменено";
                    break;
            }

            return {
                ...order,
                status: statusText,
                pagesPrinted: pagesPrinted,
            };
        });

        return {
            user: req.user,
            files,
            orders,
        };
    }

    @UseGuards(IsNotAuthenticatedGuard)
    @Get("/login")
    @Render("login")
    login() {
        return null;
    }

    @UseGuards(IsNotAuthenticatedGuard)
    @Get("/register")
    @Render("register")
    register() {
        return null;
    }
}
