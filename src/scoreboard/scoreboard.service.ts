import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "entities/scoreboard.entity";
import { randomUUID } from "crypto";

@Injectable()
export class ScoreboardService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    createScoreboard(scoreboard: CreateScoreboardDto): Scoreboard {
        const newScoreboard: Scoreboard = {
            scoreboardName: scoreboard.scoreboardName,
            id: randomUUID(),
        };

        const createdScoreboard = this.em.create<Scoreboard>("Scoreboard", newScoreboard);
        void this.em.persistAndFlush(createdScoreboard);

        return createdScoreboard;
    }

    async getAllScoreboards(): Promise<Scoreboard[]> {
        return this.em.find<Scoreboard>("Scoreboard", {});
    }
}
