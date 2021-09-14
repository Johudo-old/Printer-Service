import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Render,
    Request,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { AuthExceptionFilter } from "src/common/filters/auth-exceptions.filter";
import { AdminUserGuard } from "src/common/guards/adminUser.guard";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";
import { OrdersService } from "src/orders/orders.service";
import { UsersService } from "src/users/users.service";

@Controller("admin")
@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard, AdminUserGuard)
export class AdminController {
    constructor(
        private readonly userService: UsersService,
        private readonly orderService: OrdersService,
    ) {}

    @Get("")
    @Render("admin/admin")
    admin() {
        return {
            tables: [
                { name: "Пользователи", url: "/admin/users" },
                { name: "Заказы", url: "/admin/orders" },
                // { name: "Файлы", url: "/admin/files" },
            ],
        };
    }

    @Get("users")
    @Render("admin/admin-users-list")
    async usersTable() {
        return {
            users: await this.userService.getAllUsers(),
        };
    }

    @Get("users/:userID")
    @Render("admin/admin-user")
    async user(@Param() { userID }, @Request() req: any) {
        if (isNaN(Number(userID))) throw new NotFoundException();

        const user = await this.userService.getUserById(Number(userID));
        let orders = await this.orderService.getOrdersByUser(user, false);

        if (!user) throw new NotFoundException();

        let printedPagesCount = 0;
        orders.forEach((item) => {
            printedPagesCount += item.pagesPrinted;
        });

        const sortTime_start = new Date(req.query.sortTime_start).getTime();
        const sortTime_end = new Date(req.query.sortTime_end).getTime();

        if (sortTime_start)
            orders = orders.filter((order) => {
                return order.createDate.getTime() > sortTime_start;
            });

        if (sortTime_end)
            orders = orders.filter((order) => {
                return order.createDate.getTime() < sortTime_end;
            });

        return {
            user: {
                ...user,
                orders: this.orderService.formatFilesDate(orders).reverse(),
                ordersStatistic: {
                    printedFilesCount: orders.length,
                    printedPagesCount,

                    sortTime: {
                        start: !isNaN(sortTime_start)
                            ? new Date(sortTime_start)
                                  .toISOString()
                                  .substring(0, 10)
                            : undefined,
                        end: !isNaN(sortTime_end)
                            ? new Date(sortTime_end)
                                  .toISOString()
                                  .substring(0, 10)
                            : undefined,
                    },
                },
            },
        };
    }

    @Get("orders")
    @Render("admin/admin-orders-list")
    async orderssTable(@Request() req: any) {
        let orders = await this.orderService.getAllOrders(false);

        let printedPagesCount = 0;
        orders.forEach((item) => {
            printedPagesCount += item.pagesPrinted;
        });

        const sortTime_start = new Date(req.query.sortTime_start).getTime();
        const sortTime_end = new Date(req.query.sortTime_end).getTime();

        if (sortTime_start)
            orders = orders.filter((order) => {
                return order.createDate.getTime() > sortTime_start;
            });

        if (sortTime_end)
            orders = orders.filter((order) => {
                return order.createDate.getTime() < sortTime_end;
            });

        return {
            orders: this.orderService.formatFilesDate(orders).reverse(),
            ordersStatistic: {
                printedFilesCount: orders.length,
                printedPagesCount,

                sortTime: {
                    start: !isNaN(sortTime_start)
                        ? new Date(sortTime_start)
                              .toISOString()
                              .substring(0, 10)
                        : undefined,
                    end: !isNaN(sortTime_end)
                        ? new Date(sortTime_end).toISOString().substring(0, 10)
                        : undefined,
                },
            },
        };
    }
}
