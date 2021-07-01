import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.log(exception);
        console.log(exception instanceof ForbiddenException);

        if (
            exception instanceof UnauthorizedException ||
            exception instanceof ForbiddenException
        ) {
            request.flash("loginError", "Please try again!");
            return response.redirect("/login");
        }

        if (exception instanceof NotFoundException) {
            return response.status(404).render("404");
        }

        return response.send("");
    }
}
