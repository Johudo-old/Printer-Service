import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection } from "typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";
import * as dotenv from "dotenv";
import { AdminModule } from "./admin/admin.module";

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,

            entities: [
                "dist/**/*.entity{ .ts,.js}",
                "node_modules/nestjs-admin/**/*.entity.js",
            ],

            synchronize: false,
            logging: true,

            migrationsTableName: "migrations",
            migrations: ["dist/migration/*.js"],
            cli: {
                migrationsDir: "migration",
            },
        }),
        UsersModule,
        OrdersModule,
        AuthModule,
        AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
