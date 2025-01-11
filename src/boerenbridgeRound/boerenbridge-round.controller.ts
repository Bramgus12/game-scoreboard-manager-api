import {
    Body,
    Controller,
    NotFoundException,
    Param,
    Post,
    Put,
    Request,
} from "@nestjs/common";
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { BoerenbridgeRoundService } from "./boerenbridge-round.service";
import { BoerenbridgeRound } from "../entities/boerenbridge-round.entity";
import { RequestWithAuthUser } from "../types/requestWithUser";
import { UUID } from "crypto";
import { CreateBoerenbridgeRound } from "./dto/create-boerenbridge-round.dto";
import { UpdateBoerenbridgeRound } from "./dto/update-boerenbridge-round.dto";

@Controller(
    "scoreboard/:scoreboardId/boerenbridge-game/:boerenbridgeGameId/boerenbridge-player/:boerenbridgePlayerId/boerenbridge-round",
)
@ApiSecurity("bearer")
@ApiTags("boerenbridge-round")
export class BoerenbridgeRoundController {
    constructor(
        private readonly boerenbridgeRoundService: BoerenbridgeRoundService,
    ) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: BoerenbridgeRound,
    })
    createBoerenbridgeRoundForPlayer(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
        @Param("boerenbridgePlayerId") boerenbridgePlayerId: UUID,
        @Body() boerenbridgeRound: CreateBoerenbridgeRound,
    ): Promise<BoerenbridgeRound> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgeRoundService.createRoundForPlayer(
            scoreboardId,
            boerenbridgeGameId,
            boerenbridgePlayerId,
            req.user.id,
            boerenbridgeRound,
        );
    }

    @Put(":boerenbridgeRoundId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: BoerenbridgeRound,
    })
    updateBoerenbridgeRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
        @Param("boerenbridgePlayerId") boerenbridgePlayerId: UUID,
        @Param("boerenbridgeRoundId") boerenbridgeRoundId: UUID,
        @Body() boerenbridgeRound: UpdateBoerenbridgeRound,
    ): Promise<BoerenbridgeRound> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgeRoundService.updateRoundForPlayer(
            scoreboardId,
            boerenbridgeGameId,
            boerenbridgePlayerId,
            boerenbridgeRoundId,
            req.user.id,
            boerenbridgeRound,
        );
    }
}
