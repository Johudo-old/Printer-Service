import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DefaultAdminSite } from "nestjs-admin";
import { BackofficeModule } from "src/backoffice/backoffice.module";
import { User } from "./user.entity";
import { UserAdmin } from "./users.admin";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), BackofficeModule],
    providers: [UsersService, UserAdmin],
    controllers: [UsersController],
    exports: [TypeOrmModule],
})
export class UsersModule {
    constructor(adminSite: DefaultAdminSite) {
        adminSite.register("User", UserAdmin);
    }
}
