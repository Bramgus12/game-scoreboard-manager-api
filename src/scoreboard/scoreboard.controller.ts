import { Body, Controller, Get, Post } from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "entities/scoreboard.entity";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("scoreboard")
@ApiTags("scoreboard")
export class ScoreboardController {
    constructor(private readonly scoreboardService: ScoreboardService) {}

    @Post()
    @ApiResponse({ status: 201, description: "The record has been successfully created.", type: Scoreboard })
    createScoreboard(@Body() scoreboard: CreateScoreboardDto): Scoreboard {
        const createdScoreboard = this.scoreboardService.createScoreboard(scoreboard);

        return createdScoreboard;
    }

    @Get()
    @ApiResponse({ status: 200, description: "The list of all scoreboards.", type: [Scoreboard] })
    async getAllScoreboards(): Promise<Scoreboard[]> {
        return this.scoreboardService.getAllScoreboards();
    }
}
