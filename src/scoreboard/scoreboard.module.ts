import { Module } from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";
import { ScoreboardController } from "./scoreboard.controller";
import { KlaverjasTeamService } from "../klaverjasTeam/klaverjas-team.service";

@Module({
    providers: [ScoreboardService, KlaverjasTeamService],
    controllers: [ScoreboardController],
})
export class ScoreboardModule {}
