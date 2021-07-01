import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
} from "@nestjs/common";

@Catch()
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();

        if (exception instanceof NotFoundException) {
            return response.status(404).render("404");
        }

        return;
    }
}
