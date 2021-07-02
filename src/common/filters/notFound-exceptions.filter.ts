import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse<Response>();

        if (
            exception instanceof NotFoundException ||
            (exception instanceof Object && exception.status === 404) ||
            exception.statusCode === 404
        ) {
            return response.status(404).render("404");
        }

        const status =
            exception.getStatus instanceof Function
                ? exception.getStatus()
                : exception.status | exception.statusCode | 404;

        return response.status(status).send();
    }
}
