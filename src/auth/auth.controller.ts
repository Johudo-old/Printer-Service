import {
    Controller,
    Post,
    UseGuards,
    HttpCode,
    HttpStatus,
    Res,
    Request,
    Get,
} from "@nestjs/common";
import { Response } from "express";
import { LoginGuard } from "src/common/guards/login.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LoginGuard)
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login() {
        return "/";
    }

    @Get("/logout")
    logout(@Request() req, @Res() res: Response) {
        req.logout();
        res.redirect("/");
    }
}
