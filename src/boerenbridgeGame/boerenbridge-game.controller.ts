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
import { RequestWithAuthUser } from "../types/requestWithUser";
import { UUID } from "crypto";
import { BoerenbridgeGame } from "../entities/boerenbridge-game.entity";
import { BoerenbridgeGameService } from "./boerenbridge-game.service";
import { CreateBoerenbridgeGame } from "./dto/create-boerenbridge-game.dto";
import { UpdateBoerenbridgeGame } from "./dto/update-boerenbridge-game.dto";

@Controller("scoreboard/:scoreboardId/boerenbridge-game")
@ApiSecurity("bearer")
@ApiTags("boerenbridge-game")
export class BoerenbridgeGameController {
    constructor(private readonly boerenbridgeGameService: BoerenbridgeGameService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "The corresponding boerenbridge game for the scoreboard.",
        type: BoerenbridgeGame,
    })
    getBoerenbridgeGameByScoreboardId(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
    ): Promise<BoerenbridgeGame> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgeGameService.getBoerenbridgeGameByScoreboardId(
            scoreboardId,
            req.user.id,
        );
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: BoerenbridgeGame,
    })
    createKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Body() boerenbridgeGame: CreateBoerenbridgeGame,
    ): Promise<BoerenbridgeGame> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgeGameService.createBoerenbridgeGame(
            scoreboardId,
            req.user.id,
            boerenbridgeGame,
        );
    }

    @Put(":boerenbridgeGameId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: BoerenbridgeGame,
    })
    updateKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
        @Body() boerenbridgeGame: UpdateBoerenbridgeGame,
    ): Promise<BoerenbridgeGame> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgeGameService.updateBoerenbridgeGame(
            scoreboardId,
            req.user.id,
            boerenbridgeGameId,
            boerenbridgeGame,
        );
    }
}
