import {
    Controller,
    Get,
    Render,
    Request,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthExceptionFilter } from "./common/filters/auth-exceptions.filter";
import { AuthenticatedGuard } from "./common/guards/authenticated.guard";
import { OrdersService } from "./orders/orders.service";
import { UsersService } from "./users/users.service";

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly orderService: OrdersService,
        private readonly userService: UsersService,
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get("/")
    @Render("account")
    async account(@Request() req) {
        const user = await this.userService.getUserById(req.user.id);
        let orders: any = await this.orderService.getOrdersByUserId(user);

        orders = orders.map((order) => {
            return {
                ...order,
                createDate: order.createDate.toLocaleString("ru-RU"),
            };
        });

        return {
            user: req.user,
            orders: orders,
        };
    }

    @Get("/login")
    @Render("login")
    login() {
        return null;
    }

    @Get("/register")
    @Render("register")
    register() {
        return null;
    }

    @Get("/admin")
    admin() {
        console.log("\nTEST\n\n");
    }
}
