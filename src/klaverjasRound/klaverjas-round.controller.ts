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
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { KlaverjasRoundService } from "./klaverjas-round.service";
import { KlaverjasRound } from "../entities/klaverjas-round.entity";
import { RequestWithAuthUser } from "../types/requestWithUser";
import { UUID } from "crypto";
import { CreateKlaverjasRound } from "./dto/create-klaverjas-round.dto";
import { UpdateKlaverjasRound } from "./dto/update-klaverjas-round.dto";

@Controller(
    "scoreboard/:scoreboardId/klaverjas-team/:klaverjasTeamId/klaverjas-round",
)
@ApiSecurity("bearer")
@ApiTags("klaverjas-round")
export class KlaverjasRoundController {
    constructor(private readonly klaverjasRoundService: KlaverjasRoundService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "The list of all klaverjas rounds for a klaverjas team.",
        type: [KlaverjasRound],
    })
    getKlaverjasRoundsByKlaverjasTeamId(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("klaverjasTeamId") klaverjasTeamId: UUID,
    ): Promise<Array<KlaverjasRound>> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasRoundService.getKlaverjasRoundsByTeamId(
            scoreboardId,
            klaverjasTeamId,
            req.user.id,
        );
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: KlaverjasRound,
    })
    createKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("klaverjasTeamId") klaverjasTeamId: UUID,
        @Body() klaverjasRound: CreateKlaverjasRound,
    ): Promise<KlaverjasRound> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasRoundService.createKlaverjasRound(
            scoreboardId,
            klaverjasTeamId,
            req.user.id,
            klaverjasRound,
        );
    }

    @Put(":klaverjasRoundId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: KlaverjasRound,
    })
    updateKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("klaverjasTeamId") klaverjasTeamId: UUID,
        @Param("klaverjasRoundId") klaverjasRoundId: UUID,
        @Body() klaverjasRound: UpdateKlaverjasRound,
    ): Promise<KlaverjasRound> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.klaverjasRoundService.updateKlaverjasRound(
            scoreboardId,
            klaverjasTeamId,
            req.user.id,
            klaverjasRoundId,
            klaverjasRound,
        );
    }
}
