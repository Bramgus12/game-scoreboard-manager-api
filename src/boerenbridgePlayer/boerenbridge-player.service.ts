import { EntityManager, MikroORM } from "@mikro-orm/core";
import { randomUUID, UUID } from "crypto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { Injectable } from "@nestjs/common";
import { BoerenbridgeGame } from "../entities/boerenbridge-game.entity";
import { BoerenbridgePlayer } from "../entities/boerenbridge-player.entity";
import { CreateBoerenbridgePlayer } from "./dto/create-boerenbridge-player.dto";
import { UpdateBoerenbridgePlayer } from "./dto/update-boerenbridge-player.dto";

@Injectable()
export class BoerenbridgePlayerService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getBoerenbridgePlayerByGameId(
        scoreboardId: UUID,
        gameId: UUID,
        userId: UUID,
    ): Promise<Array<BoerenbridgePlayer>> {
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

        const players = await this.em.find<BoerenbridgePlayer>(
            "BoerenbridgePlayer",
            {
                game: game.id,
            },
        );

        return Promise.all(
            players.map(async (player) => {
                if (!player.rounds.isInitialized()) {
                    await player.rounds.init();
                }
                return player;
            }),
        );
    }

    async createBoerenbridgePlayer(
        scoreboardId: UUID,
        gameId: UUID,
        userId: UUID,
        boerenbridgePlayer: CreateBoerenbridgePlayer,
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

        const newBoerenbridgePlayer = new BoerenbridgePlayer();
        newBoerenbridgePlayer.id = randomUUID();
        newBoerenbridgePlayer.game = game;
        newBoerenbridgePlayer.name = boerenbridgePlayer.name;

        const createdBoerenbridgeGame = this.em.create<BoerenbridgePlayer>(
            "BoerenbridgePlayer",
            newBoerenbridgePlayer,
        );

        void this.em.persistAndFlush(createdBoerenbridgeGame);

        return createdBoerenbridgeGame;
    }

    async updateBoerenbridgePlayer(
        scoreboardId: UUID,
        gameId: UUID,
        userId: UUID,
        boerenbridgePlayerId: UUID,
        boerenbridgePlayer: UpdateBoerenbridgePlayer,
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

        const updatedBoerenbridgePlayer =
            await this.em.findOneOrFail<BoerenbridgePlayer>("BoerenbridgePlayer", {
                id: boerenbridgePlayerId,
                game: game.id,
            });

        updatedBoerenbridgePlayer.name = boerenbridgePlayer.name;

        // Make sure to return an empty array if the rounds are not initialized
        if (!updatedBoerenbridgePlayer.rounds.isInitialized()) {
            await updatedBoerenbridgePlayer.rounds.init();
        }

        void this.em.persistAndFlush(updatedBoerenbridgePlayer);

        return updatedBoerenbridgePlayer;
    }
}
