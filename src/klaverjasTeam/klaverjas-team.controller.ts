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
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { KlaverjasTeam } from "../entities/klaverjas-team.entity";
import { RequestWithAuthUser } from "../types/requestWithUser";
import { UUID } from "crypto";
import { CreateKlaverjasTeam } from "./dto/create-klaverjas-team.dto";
import { UpdateKlaverjasTeam } from "./dto/update-klaverjas-team.dto";
import { KlaverjasTeamService } from "./klaverjas-team.service";

@Controller("scoreboard/:scoreboardId/klaverjas-team")
@ApiSecurity("bearer")
@ApiTags("klaverjas-team")
export class KlaverjasTeamController {
    constructor(private readonly klaverjasTeamService: KlaverjasTeamService) {}

    @Get()
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

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: [KlaverjasTeam],
    })
    @ApiBody({ type: [CreateKlaverjasTeam] })
    createKlaverjasTeams(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Body() klaverjasTeams: Array<CreateKlaverjasTeam>,
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

    @Put(":klaverjasTeamId")
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
