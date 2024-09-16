import { Module } from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";
import { ScoreboardController } from "./scoreboard.controller";
import { KlaverjasTeamService } from "../klaverjasTeam/klaverjas-team.service";
import { KlaverjasRoundService } from "../klaverjasRound/klaverjas-round.service";

@Module({
    providers: [ScoreboardService, KlaverjasTeamService, KlaverjasRoundService],
    controllers: [ScoreboardController],
})
export class ScoreboardModule {}
