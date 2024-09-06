import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

@Entity()
export class Scoreboard {
    @PrimaryKey({ type: "uuid" })
    @ApiProperty()
    id!: UUID;

    @Property()
    @ApiProperty()
    scoreboardName!: string;
}
