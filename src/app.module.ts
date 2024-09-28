import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";
import mikroOrmConfig from "./mikro-orm.config";
import { KlaverjasTeamModule } from "./klaverjasTeam/klaverjas-team.module";
import { KlaverjasRoundModule } from "./klaverjasRound/klaverjas-round.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".local.env", ".env"],
            isGlobal: true,
        }),
        MikroOrmModule.forRoot(mikroOrmConfig),
        ScoreboardModule,
        KlaverjasTeamModule,
        KlaverjasRoundModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {}
