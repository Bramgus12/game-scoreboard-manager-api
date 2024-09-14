import { Body, Controller, Get, NotFoundException, Post, Request } from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { RequestWithAuthUser } from "../types/requestWithUser";

@Controller("scoreboard")
@ApiSecurity("bearer")
@ApiTags("scoreboard")
export class ScoreboardController {
    constructor(private readonly scoreboardService: ScoreboardService) {}

    @Post()
    @ApiResponse({ status: 201, description: "The record has been successfully created.", type: Scoreboard })
    createScoreboard(@Request() req: RequestWithAuthUser, @Body() scoreboard: CreateScoreboardDto): Scoreboard {
        const user = req.user;

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        return this.scoreboardService.createScoreboard(scoreboard, user);
    }

    @Get()
    @ApiResponse({ status: 200, description: "The list of all scoreboards.", type: [Scoreboard] })
    async getAllScoreboards(): Promise<Scoreboard[]> {
        return this.scoreboardService.getAllScoreboards();
    }
}
