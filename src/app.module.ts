import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { UserModule } from "user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
    imports: [MikroOrmModule.forRoot(), ScoreboardModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
