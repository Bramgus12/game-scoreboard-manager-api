import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Handler } from "aws-lambda";
import { Server } from "http";
import { createServer, proxy } from "aws-serverless-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MikroORM } from "@mikro-orm/core";

let server: Server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Game Scoreboard manager API")
        .setVersion("1.0")
        .addTag("scoreboard")
        .addTag("root")
        .addBearerAuth({ type: "http", scheme: "bearer", name: "Authorization" })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);

    await MikroORM.init();

    app.enableCors();

    await app.init();
    server = createServer(app.getHttpAdapter().getInstance());
}

export const handler: Handler = async (event, context) => {
    if (server == null) {
        await bootstrap();
    }
    return proxy(server, event, context, "PROMISE").promise;
};
