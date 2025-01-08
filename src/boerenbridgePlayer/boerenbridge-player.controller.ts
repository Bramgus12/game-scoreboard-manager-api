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
import { BoerenbridgePlayer } from "../entities/boerenbridge-player.entity";
import { BoerenbridgePlayerService } from "./boerenbridge-player.service";
import { CreateBoerenbridgePlayer } from "./dto/create-boerenbridge-player.dto";
import { UpdateBoerenbridgePlayer } from "./dto/update-boerenbridge-player.dto";

@Controller(
    "scoreboard/:scoreboardId/boerenbridge-game/:boerenbridgeGameId/boerenbridge-player",
)
@ApiSecurity("bearer")
@ApiTags("boerenbridge-player")
export class BoerenbridgePlayerController {
    constructor(
        private readonly boerenbridgePlayerService: BoerenbridgePlayerService,
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "All the players for a boerenbridge game.",
        type: [BoerenbridgePlayer],
    })
    getBoerenbridgePlayerByGameId(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
    ): Promise<Array<BoerenbridgePlayer>> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgePlayerService.getBoerenbridgePlayerByGameId(
            scoreboardId,
            boerenbridgeGameId,
            req.user.id,
        );
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: "The record has been successfully created.",
        type: BoerenbridgePlayer,
    })
    createKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
        @Body() boerenbridgePlayer: CreateBoerenbridgePlayer,
    ): Promise<BoerenbridgePlayer> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgePlayerService.createBoerenbridgePlayer(
            scoreboardId,
            boerenbridgeGameId,
            req.user.id,
            boerenbridgePlayer,
        );
    }

    @Put(":boerenbridgePlayerId")
    @ApiResponse({
        status: 200,
        description: "The record has been successfully updated.",
        type: BoerenbridgePlayer,
    })
    updateKlaverjasRound(
        @Request() req: RequestWithAuthUser,
        @Param("scoreboardId") scoreboardId: UUID,
        @Param("boerenbridgeGameId") boerenbridgeGameId: UUID,
        @Param("boerenbridgePlayerId") boerenbridgePlayerId: UUID,
        @Body() boerenbridgePlayer: UpdateBoerenbridgePlayer,
    ): Promise<BoerenbridgePlayer> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return this.boerenbridgePlayerService.updateBoerenbridgePlayer(
            scoreboardId,
            boerenbridgeGameId,
            req.user.id,
            boerenbridgePlayerId,
            boerenbridgePlayer,
        );
    }
}
