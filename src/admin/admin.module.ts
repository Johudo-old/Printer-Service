import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/common/entities/order.entity";
import { User } from "src/common/entities/user.entity";
import { OrdersService } from "src/orders/orders.service";
import { UsersService } from "src/users/users.service";
import { AdminController } from "./admin.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Order])],
    providers: [UsersService, OrdersService],
    controllers: [AdminController],
})
export class AdminModule {}
