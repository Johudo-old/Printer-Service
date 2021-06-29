import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection } from "typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";
import { AdminModule } from "@admin-bro/nestjs";
import { UserAdminResourceOption } from "./common/entities/user.entity";
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro from "admin-bro";
import { OrderAdminResourceOption } from "./common/entities/order.entity";

AdminBro.registerAdapter({ Database, Resource });

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        OrdersModule,
        AuthModule,
        AdminModule.createAdmin({
            adminBroOptions: {
                resources: [UserAdminResourceOption, OrderAdminResourceOption],
                rootPath: "/admin",
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
