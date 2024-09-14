import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { CreateScoreboardDto } from "./dto/create-scoreboard.dto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { randomUUID } from "crypto";
import { User } from "../entities/user.entity";

@Injectable()
export class ScoreboardService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    createScoreboard(scoreboard: CreateScoreboardDto, user: User): Scoreboard {
        const newScoreboard = new Scoreboard();
        newScoreboard.scoreboardName = scoreboard.scoreboardName;
        newScoreboard.user = user;
        newScoreboard.id = randomUUID();

        const createdScoreboard = this.em.create<Scoreboard>("Scoreboard", newScoreboard);
        void this.em.persistAndFlush(createdScoreboard);

        return createdScoreboard;
    }

    async getAllScoreboards(): Promise<Scoreboard[]> {
        return this.em.find<Scoreboard>("Scoreboard", {});
    }
}
