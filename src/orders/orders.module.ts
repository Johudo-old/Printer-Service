import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/common/entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        MulterModule.register({
            dest: "./files",
        }),
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
