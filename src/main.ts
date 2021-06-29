import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from "hbs";
import * as session from "express-session";
import flash = require("connect-flash");
import * as passport from "passport";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.useStaticAssets(join(__dirname, "..", "..", "static"));
    app.setBaseViewsDir(join(__dirname, "..", "..", "views"));
    app.setViewEngine("hbs");

    hbs.registerPartials(join(__dirname, "..", "..", "views", "components"));

    app.use(
        session({
            secret: process.env.SESSION_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    await app.listen(process.env.SERVER_PORT);
}

bootstrap();
