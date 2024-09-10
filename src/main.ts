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
    SwaggerModule.setup("swagger", app, document, {
        customJs: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js",
        ],
        customCssUrl: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.css",
        ],
    });

    const orm = await MikroORM.init();

    const migrator = orm.getMigrator();

    await migrator.up();

    app.enableCors();

    await app.listen(configService.get<string>("PORT") ?? 3000);
}
void bootstrap();
