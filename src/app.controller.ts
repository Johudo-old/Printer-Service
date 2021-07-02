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
import { NotFoundFilter } from "./common/filters/notFound-exceptions.filter";
import { AuthenticatedGuard } from "./common/guards/authenticated.guard";
import { IsNotAuthenticatedGuard } from "./common/guards/inNotAuthenticated.guard";
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
        let orders: any = await this.orderService.getOrdersByUserId(user, true);

        return {
            user: req.user,
            orders: orders,
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
