import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";

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
}
