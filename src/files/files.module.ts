import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "src/common/entities/file.entity";
import { OrdersModule } from "src/orders/orders.module";
import { OrdersService } from "src/orders/orders.service";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        MulterModule.register({
            dest: "./files",
        }),
        OrdersModule,
    ],
    providers: [FilesService, OrdersService],
    controllers: [FilesController],
    exports: [TypeOrmModule, FilesService],
})
export class FilesModule {}
