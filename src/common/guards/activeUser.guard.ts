import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class ActiveUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return (request.user as User).isActive;
    }
}
