import { EntityManager, MikroORM } from "@mikro-orm/core";
import { KlaverjasRound } from "../entities/klaverjas-round.entity";
import { KlaverjasTeam } from "../entities/klaverjas-team.entity";
import { randomUUID, UUID } from "crypto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { CreateKlaverjasRound } from "./dto/create-klaverjas-round.dto";
import { UpdateKlaverjasRound } from "./dto/update-klaverjas-round.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KlaverjasRoundService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getKlaverjasRoundsByTeamId(
        scoreboardId: UUID,
        teamId: UUID,
        userId: UUID,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const team = await this.em.findOneOrFail<KlaverjasTeam>("KlaverjasTeam", {
            id: teamId,
            scoreboard: scoreboard.id,
        });

        return await this.em.find<KlaverjasRound>("KlaverjasRound", {
            klaverjasTeam: team.id,
        });
    }

    async createKlaverjasRound(
        scoreboardId: UUID,
        teamId: UUID,
        userId: UUID,
        klaverjasRound: CreateKlaverjasRound,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const team = await this.em.findOneOrFail<KlaverjasTeam>("KlaverjasTeam", {
            id: teamId,
            scoreboard: scoreboard.id,
        });

        const newKlaverjasRound = new KlaverjasRound();
        newKlaverjasRound.id = randomUUID();
        newKlaverjasRound.roundNumber = klaverjasRound.roundNumber;
        newKlaverjasRound.points = klaverjasRound.points;
        newKlaverjasRound.fame = klaverjasRound.fame;
        newKlaverjasRound.isPit = klaverjasRound.isPit;
        newKlaverjasRound.isWet = klaverjasRound.isWet;
        newKlaverjasRound.klaverjasTeam = team;

        const createdKlaverjasRound = this.em.create<KlaverjasRound>(
            "KlaverjasRound",
            newKlaverjasRound,
        );

        void this.em.persistAndFlush(createdKlaverjasRound);

        return createdKlaverjasRound;
    }

    async updateKlaverjasRound(
        scoreboardId: UUID,
        teamId: UUID,
        userId: UUID,
        klaverjasRoundId: UUID,
        klaverjasRound: UpdateKlaverjasRound,
    ) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const team = await this.em.findOneOrFail<KlaverjasTeam>("KlaverjasTeam", {
            id: teamId,
            scoreboard: scoreboard.id,
        });

        const updatedKlaverjasRound = await this.em.findOneOrFail<KlaverjasRound>(
            "KlaverjasRound",
            { id: klaverjasRoundId, klaverjasTeam: team.id },
        );

        updatedKlaverjasRound.roundNumber = klaverjasRound.roundNumber;
        updatedKlaverjasRound.points = klaverjasRound.points;
        updatedKlaverjasRound.fame = klaverjasRound.fame;
        updatedKlaverjasRound.isPit = klaverjasRound.isPit;
        updatedKlaverjasRound.isWet = klaverjasRound.isWet;

        void this.em.persistAndFlush(updatedKlaverjasRound);

        return updatedKlaverjasRound;
    }
}
