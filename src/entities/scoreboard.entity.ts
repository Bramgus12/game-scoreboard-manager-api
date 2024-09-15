import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { GAME_TYPE } from "../constants/gameType";
import { GameType } from "../enums/gameType";

@Entity()
export class Scoreboard extends BaseEntity {
    @Property()
    @ApiProperty()
    scoreboardName!: string;

    @ManyToOne()
    @ApiProperty({ type: "string", format: "uuid" })
    user!: User;

    @Property()
    @ApiProperty({ enum: Object.values(GAME_TYPE) })
    gameType?: GameType;
}
