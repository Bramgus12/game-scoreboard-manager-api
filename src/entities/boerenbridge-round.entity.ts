import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BoerenbridgePlayer } from "./boerenbridge-player.entity";

@Entity()
export class BoerenbridgeRound extends BaseEntity {
    @Property()
    @ApiProperty()
    roundNumber: number;

    @Property()
    @ApiProperty()
    guess: number;

    @Property()
    @ApiProperty()
    isCorrect: boolean;

    @Property()
    @ApiProperty()
    penaltyPoints?: number;

    @ManyToOne({ entity: () => BoerenbridgePlayer })
    @ApiProperty({ type: "string", format: "uuid" })
    player: BoerenbridgePlayer;
}
