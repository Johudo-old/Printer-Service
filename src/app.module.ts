import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection } from "typeorm";
import { UsersModule } from "./users/users.module";
import { BackofficeModule } from "./backoffice/backoffice.module";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        BackofficeModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
