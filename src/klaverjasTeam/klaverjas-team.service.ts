import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { Scoreboard } from "../entities/scoreboard.entity";
import { KlaverjasTeam } from "../entities/klaverjas-team.entity";
import { UpdateKlaverjasTeam } from "./dto/update-klaverjas-team.dto";
import { CreateKlaverjasTeam } from "./dto/create-klaverjas-team.dto";

@Injectable()
export class KlaverjasTeamService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getKlaverjasTeamsByScoreboardId(scoreboardId: UUID, userId: UUID) {
        const scoreboard = await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        return await this.em.find<KlaverjasTeam>("KlaverjasTeam", {
            scoreboard: scoreboard.id,
        });
    }

    createKlaverjasTeams(
        scoreboardId: UUID,
        userId: UUID,
        klaverjasTeams: CreateKlaverjasTeam[],
    ) {
        return Promise.all(
            klaverjasTeams.map(async (klaverjasTeam) => {
                const scoreboard = await this.em.findOneOrFail<Scoreboard>(
                    "Scoreboard",
                    {
                        id: scoreboardId,
                        user: userId,
                    },
                );

                const newKlaverjasTeam = new KlaverjasTeam();
                newKlaverjasTeam.type = klaverjasTeam.type;
                newKlaverjasTeam.name = klaverjasTeam.name;
                newKlaverjasTeam.scoreboard = scoreboard;

                const createdKlaverjasTeam = this.em.create<KlaverjasTeam>(
                    "KlaverjasTeam",
                    newKlaverjasTeam,
                );
                void this.em.persistAndFlush(createdKlaverjasTeam);

                return createdKlaverjasTeam;
            }),
        );
    }

    async updateKlaverjasTeam(
        scoreboardId: UUID,
        userId: UUID,
        klaverjasTeamId: UUID,
        klaverjasTeam: UpdateKlaverjasTeam,
    ): Promise<KlaverjasTeam> {
        await this.em.findOneOrFail<Scoreboard>("Scoreboard", {
            id: scoreboardId,
            user: userId,
        });

        const updatedKlaverjasTeam = await this.em.findOneOrFail<KlaverjasTeam>(
            "KlaverjasTeam",
            { id: klaverjasTeamId },
        );

        updatedKlaverjasTeam.type = klaverjasTeam.type;
        updatedKlaverjasTeam.name = klaverjasTeam.name;

        void this.em.persistAndFlush(updatedKlaverjasTeam);

        return updatedKlaverjasTeam;
    }
}
