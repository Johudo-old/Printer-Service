import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../common/entities/user.entity";
import { UserAdmin } from "./users.admin";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UserAdmin],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
