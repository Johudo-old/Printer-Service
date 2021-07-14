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
import { listPrintingFiles } from "./utils/printerWorker.util";
import * as dotenv from "dotenv";

dotenv.config();

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
    @Render("main")
    async main(@Request() req) {
        let isQueryShowed: boolean = false;

        if (req.query.is_queue && req.query.is_queue === "true")
            isQueryShowed = true;

        const user = await this.userService.getUserById(req.user.id);

        if (!isQueryShowed) {
            let files: Array<any> = await this.filesService.getFilesByUserId(
                user,
                true,
            );

            return {
                isQueryShowed,
                user: req.user,
                files,
            };
        }

        const execResult = await listPrintingFiles();
        //         const execResult = `cowork-51               pi               86016   Ср 14 июл 2021 17:00:50
        // cowork-52               pi               86016   Ср 14 июл 2021 17:00:52`;
        const regexp = new RegExp(process.env.PRINTER_NAME + "-\\d+", "g");
        const matches = [];
        let match = regexp.exec(execResult);

        while (match != null) {
            matches.push(match[0]);
            match = regexp.exec(execResult);
        }

        console.log(matches);

        let orders: Array<any> = await this.ordersService.getOrdersByPrinterTasks(
            matches,
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
                    statusText = "Отправлено на печать";
                    break;
                case OrderStatus.Canceled:
                    statusText = "Отменено";
                    break;
            }

            return {
                ...order,
                status: statusText,
                pagesPrinted: pagesPrinted,
                canCanceled: user.id === order.user.id || user.isAdmin,
            };
        });

        return {
            isQueryShowed,
            user: req.user,
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
