import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { randomUUID, UUID } from "crypto";
import { User } from "../entities/user.entity";
import { UpdateScoreboardDto } from "./dto/update-scoreboard.dto";

@Injectable()
export class ScoreboardService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    createScoreboard(scoreboard: CreateScoreboardDto, user: User): Scoreboard {
        const newScoreboard = new Scoreboard();
        newScoreboard.scoreboardName = scoreboard.scoreboardName;
        newScoreboard.gameType = scoreboard.gameType;
        newScoreboard.user = user;
        newScoreboard.id = randomUUID();

        const createdScoreboard = this.em.create<Scoreboard>(
            "Scoreboard",
            newScoreboard,
        );
        void this.em.persistAndFlush(createdScoreboard);

        return createdScoreboard;
    }

    async updateScoreboard(
        scoreboard: UpdateScoreboardDto,
        userId: UUID,
        scoreboardId: UUID,
    ): Promise<Scoreboard> {
        const updatedScoreboard = await this.em.findOneOrFail<Scoreboard>(
            "Scoreboard",
            { id: scoreboardId, user: userId },
        );

        updatedScoreboard.scoreboardName = scoreboard.scoreboardName;

        void this.em.persistAndFlush(updatedScoreboard);

        return updatedScoreboard;
    }

    getScoreboardById(scoreboardId: UUID, userId: UUID) {
        return this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });
    }

    getAllScoreboards(userId: UUID): Promise<Scoreboard[]> {
        return this.em.find<Scoreboard>("Scoreboard", { user: userId });
    }
}
