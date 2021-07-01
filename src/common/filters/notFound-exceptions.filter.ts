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
    catch(exception: HttpException, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse<Response>();

        if (exception instanceof NotFoundException) {
            return response.status(404).render("404");
        }

        return response.status(exception.getStatus()).send();
    }
}
