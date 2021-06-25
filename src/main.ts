import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.useStaticAssets(join(__dirname, "..", "..", "static"));
    app.setBaseViewsDir(join(__dirname, "..", "..", "views"));
    app.setViewEngine("hbs");

    await app.listen(process.env.SERVER_PORT);
}

bootstrap();
