import {
    Collection,
    Entity,
    ManyToMany,
    ManyToOne,
    Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BoerenbridgeGame } from "./boerenbridge-game";
import { BoerenbridgeRound } from "./boerenbridge-round";

@Entity()
export class BoerenbridgePlayer extends BaseEntity {
    @Property()
    @ApiProperty()
    name: string;

    @ManyToOne()
    @ApiProperty({ type: "string", format: "uuid" })
    game: BoerenbridgeGame;

    @ManyToMany({ entity: () => BoerenbridgeRound })
    @ApiProperty()
    rounds = new Collection<BoerenbridgeRound>(this);
}
