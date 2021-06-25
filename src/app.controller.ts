import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render("index")
    index() {
        return {};
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

    @Get("/account")
    @Render("account")
    account() {
        return {
            user: {
                firstName: "Дмитрий",
                lastName: "Зуев",
            },
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
}
