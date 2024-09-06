import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            isGlobal: true,
        }),
        MikroOrmModule.forRoot(),
        ScoreboardModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {}
