import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Render,
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

    // @Get("users/:userID")
    // @Render("admin/admin-user")
    // async user(@Param() { userID }) {
    //     if (isNaN(Number(userID))) throw new NotFoundException();

    //     const user = await this.userService.getUserById(Number(userID));

    //     if (!user) throw new NotFoundException();

    //     return {
    //         user: {
    //             ...user,
    //             orders: (
    //                 await this.orderService.getOrdersByUserId(user, true)
    //             ).reverse(),
    //         },
    //     };
    // }

    // @Get("orders")
    // @Render("admin/admin-orders-list")
    // async orderssTable() {
    //     console.log(await this.orderService.getAllOrders(true));

    //     return {
    //         orders: await this.orderService.getAllOrders(true),
    //     };
    // }

    // @Get("orders/:orderID")
    // @Render("admin/admin-order")
    // async order(@Param() { userID }) {
    //     if (isNaN(Number(userID))) throw new NotFoundException();

    //     const user = await this.userService.getUserById(Number(userID));

    //     if (!user) throw new NotFoundException();

    //     return {
    //         user: {
    //             ...user,
    //             orders: (
    //                 await this.orderService.getOrdersByUserId(user, true)
    //             ).reverse(),
    //         },
    //     };
    // }
}
