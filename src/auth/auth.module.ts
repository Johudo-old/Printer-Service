import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { SessionSerializer } from "./session.serializer";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
