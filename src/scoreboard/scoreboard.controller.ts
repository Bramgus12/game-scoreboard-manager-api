import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Request,
} from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { RequestWithAuthUser } from "../types/requestWithUser";
import { UpdateScoreboardDto } from "./dto/update-scoreboard.dto";
import { UUID } from "crypto";
import { KlaverjasTeamService } from "../klaverjasTeam/klaverjas-team.service";
import { KlaverjasTeam } from "../entities/klaverjas-team.entity";
import { CreateKlaverjasTeam } from "../klaverjasTeam/dto/create-klaverjas-team.dto";
import { UpdateKlaverjasTeam } from "../klaverjasTeam/dto/update-klaverjas-team.dto";

@Controller("scoreboard")
@ApiSecurity("bearer")
@ApiTags("scoreboard")
export class ScoreboardController {
    constructor(
        private readonly scoreboardService: ScoreboardService,
        private readonly klaverjasTeamService: KlaverjasTeamService,
    ) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: Scoreboard,
    })
    createScoreboard(
        @Request() req: RequestWithAuthUser,
        @Body() scoreboard: CreateScoreboardDto,
    ): Scoreboard {
        const user = req.user;

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        return this.scoreboardService.createScoreboard(scoreboard, user);
    }

    @Put(":scoreboardId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: Scoreboard,
    })
    updateScoreboard(
        @Request() req: RequestWithAuthUser,
        @Body() scoreboard: UpdateScoreboardDto,
        @Param("scoreboardId") id: UUID,
    ): Promise<Scoreboard> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.scoreboardService.updateScoreboard(scoreboard, req.user.id, id);
    }

    @Get(":scoreboardId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully retrieved.",
        type: Scoreboard,
    })
    getScoreboardById(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") id: UUID,
    ): Promise<Scoreboard> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.scoreboardService.getScoreboardById(id, req.user.id);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: "The list of all scoreboards.",
        type: [Scoreboard],
    })
    async getAllScoreboards(
        @Request() req: RequestWithAuthUser,
    ): Promise<Scoreboard[]> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.scoreboardService.getAllScoreboards(req.user.id);
    }

    @Get(":scoreboardId/klaverjas-teams")
    @ApiResponse({
        status: 200,
        description: "The list of all klaverjas teams for a scoreboard.",
        type: [KlaverjasTeam],
    })
    getKlaverjasTeamsByScoreboardId(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
    ): Promise<Array<KlaverjasTeam>> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasTeamService.getKlaverjasTeamsByScoreboardId(
            scoreboardId,
            req.user.id,
        );
    }

    @Post(":scoreboardId/klaverjas-teams")
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: [KlaverjasTeam],
    })
    createKlaverjasTeams(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Body() klaverjasTeams: CreateKlaverjasTeam[],
    ): Promise<Array<KlaverjasTeam>> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasTeamService.createKlaverjasTeams(
            scoreboardId,
            req.user.id,
            klaverjasTeams,
        );
    }

    @Put(":scoreboardId/klaverjas-teams/:klaverjasTeamId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: KlaverjasTeam,
    })
    updateKlaverjasTeam(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("klaverjasTeamId") klaverjasTeamId: UUID,
        @Body() klaverjasTeam: UpdateKlaverjasTeam,
    ): Promise<KlaverjasTeam> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasTeamService.updateKlaverjasTeam(
            scoreboardId,
            req.user.id,
            klaverjasTeamId,
            klaverjasTeam,
        );
    }
}
