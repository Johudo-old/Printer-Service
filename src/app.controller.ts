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

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthenticatedGuard)
    @Get("/")
    @Render("account")
    account(@Request() req) {
        return {
            user: req.user,
            orders: [
                { id: 1, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 2, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 3, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 3, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 4, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 5, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 6, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
                { id: 7, name: "Курсовая Зуев МСИC", date: "12.04.2020 13:30" },
            ],
        };
    }

    @Get("/login")
    @Render("login")
    login() {
        return {};
    }

    @Get("/register")
    @Render("register")
    register() {
        return {};
    }
}
