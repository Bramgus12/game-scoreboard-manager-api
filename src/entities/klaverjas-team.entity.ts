import { BaseEntity } from "./base.entity";
import { KlaverjasTeamType } from "../enums/klaverjasTeamType";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { KLAVERJAS_TEAM_TYPE } from "../constants/klaverjasTeamType";
import { Scoreboard } from "./scoreboard.entity";

@Entity()
export class KlaverjasTeam extends BaseEntity {
    @Property()
    @ApiProperty({ enum: Object.values(KLAVERJAS_TEAM_TYPE) })
    type: KlaverjasTeamType;

    @Property()
    @ApiProperty()
    name: string;

    @ManyToOne()
    @ApiProperty({ type: "string", format: "uuid" })
    scoreboard: Scoreboard;
}
