import {
    ExecutionContext,
    Injectable,
    CanActivate,
    NotFoundException,
} from "@nestjs/common";

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        if (request.isAuthenticated()) throw new NotFoundException();

        return true;
    }
}
