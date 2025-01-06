import { BaseEntity } from "./base.entity";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Scoreboard } from "./scoreboard.entity";

@Entity()
export class BoerenbridgeGame extends BaseEntity {
    @Property()
    @ApiProperty()
    currentRound: number;

    @Property()
    @ApiProperty()
    pointsPerCorrectGuess: number;

    @ManyToOne()
    @ApiProperty()
    scoreboard: Scoreboard;
}
