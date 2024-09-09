import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MikroORM } from "@mikro-orm/core";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

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

    await app.listen(configService.get<string>("PORT") ?? 3000);
}
void bootstrap();
