import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../common/entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
