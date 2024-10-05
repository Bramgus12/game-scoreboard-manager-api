import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { KlaverjasTeam } from "./klaverjas-team.entity";

@Entity()
export class KlaverjasRound extends BaseEntity {
    @Property()
    @ApiProperty()
    roundNumber: number;

    @Property()
    @ApiProperty()
    points: number;

    @Property()
    @ApiProperty()
    fame: number;

    @Property()
    @ApiProperty()
    isPit: boolean;

    @Property()
    @ApiProperty()
    isWet: boolean;

    @Property()
    @ApiProperty()
    isGoing: boolean;

    @ManyToOne()
    @ApiProperty({ type: "string", format: "uuid" })
    klaverjasTeam: KlaverjasTeam;
}
