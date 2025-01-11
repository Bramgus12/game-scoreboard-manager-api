import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { randomUUID, UUID } from "crypto";
import { BoerenbridgeRound } from "../entities/boerenbridge-round.entity";
import { Scoreboard } from "../entities/scoreboard.entity";
import { BoerenbridgeGame } from "../entities/boerenbridge-game.entity";
import { BoerenbridgePlayer } from "../entities/boerenbridge-player.entity";
import { UpdateBoerenbridgeRound } from "./dto/update-boerenbridge-round.dto";
import { CreateBoerenbridgeRound } from "./dto/create-boerenbridge-round.dto";

@Injectable()
export class BoerenbridgeRoundService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async createRoundForPlayer(
        scoreboardId: UUID,
        gameId: UUID,
        playerId: UUID,
        userId: UUID,
        round: CreateBoerenbridgeRound,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const game = await this.em.findOneOrFail<BoerenbridgeGame>(
            "BoerenbridgeGame",
            {
                id: gameId,
                scoreboard: scoreboard.id,
            },
        );

        const player = await this.em.findOneOrFail<BoerenbridgePlayer>(
            "BoerenbridgePlayer",
            {
                id: playerId,
                game: game.id,
            },
        );

        const newRound = new BoerenbridgeRound();
        newRound.id = randomUUID();
        newRound.roundNumber = round.roundNumber;
        newRound.player = player;
        newRound.guess = round.guess;
        newRound.isCorrect = round.isCorrect;
        newRound.penaltyPoints = round.penaltyPoints;

        const createdBoerenbridgeRound = this.em.create<BoerenbridgeRound>(
            "BoerenbridgeRound",
            newRound,
        );

        void this.em.persistAndFlush(createdBoerenbridgeRound);

        return createdBoerenbridgeRound;
    }

    async updateRoundForPlayer(
        scoreboardId: UUID,
        gameId: UUID,
        playerId: UUID,
        roundId: UUID,
        userId: UUID,
        round: UpdateBoerenbridgeRound,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const game = await this.em.findOneOrFail<BoerenbridgeGame>(
            "BoerenbridgeGame",
            {
                id: gameId,
                scoreboard: scoreboard.id,
            },
        );

        const player = await this.em.findOneOrFail<BoerenbridgePlayer>(
            "BoerenbridgePlayer",
            {
                id: playerId,
                game: game.id,
            },
        );

        const updatedRound = await this.em.findOneOrFail<BoerenbridgeRound>(
            "BoerenbridgeRound",
            {
                id: roundId,
                player: player.id,
            },
        );

        updatedRound.roundNumber = round.roundNumber;
        updatedRound.guess = round.guess;
        updatedRound.isCorrect = round.isCorrect;
        updatedRound.penaltyPoints = round.penaltyPoints;

        void this.em.persistAndFlush(updatedRound);

        return updatedRound;
    }
}
