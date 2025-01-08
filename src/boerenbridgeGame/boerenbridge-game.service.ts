import { EntityManager, MikroORM } from "@mikro-orm/core";
import { randomUUID, UUID } from "crypto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { Injectable } from "@nestjs/common";
import { BoerenbridgeGame } from "../entities/boerenbridge-game.entity";
import { CreateBoerenbridgeGame } from "./dto/create-boerenbridge-game.dto";
import { UpdateBoerenbridgeGame } from "./dto/update-boerenbridge-game.dto";

@Injectable()
export class BoerenbridgeGameService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getBoerenbridgeGameByScoreboardId(scoreboardId: UUID, userId: UUID) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        return await this.em.findOneOrFail<BoerenbridgeGame>("BoerenbridgeGame", {
            scoreboard: scoreboard.id,
        });
    }

    async createBoerenbridgeGame(
        scoreboardId: UUID,
        userId: UUID,
        boerenbridgeGame: CreateBoerenbridgeGame,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const newBoerenbridgeGame = new BoerenbridgeGame();
        newBoerenbridgeGame.id = randomUUID();
        newBoerenbridgeGame.scoreboard = scoreboard;
        newBoerenbridgeGame.currentRound = 1;
        newBoerenbridgeGame.pointsPerCorrectGuess =
            boerenbridgeGame.pointsPerCorrectGuess;

        const createdBoerenbridgeGame = this.em.create<BoerenbridgeGame>(
            "BoerenbridgeGame",
            newBoerenbridgeGame,
        );

        void this.em.persistAndFlush(createdBoerenbridgeGame);

        return createdBoerenbridgeGame;
    }

    async updateBoerenbridgeGame(
        scoreboardId: UUID,
        userId: UUID,
        boerenbridgeGameId: UUID,
        boerenbridgeGame: UpdateBoerenbridgeGame,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const updatedKlaverjasRound = await this.em.findOneOrFail<BoerenbridgeGame>(
            "BoerenbridgeGame",
            { id: boerenbridgeGameId, scoreboard: scoreboard.id },
        );

        updatedKlaverjasRound.currentRound = boerenbridgeGame.currentRound;
        updatedKlaverjasRound.pointsPerCorrectGuess =
            boerenbridgeGame.pointsPerCorrectGuess;

        void this.em.persistAndFlush(updatedKlaverjasRound);

        return updatedKlaverjasRound;
    }
}
