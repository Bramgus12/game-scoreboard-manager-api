import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Scoreboard extends BaseEntity {
    @Property()
    @ApiProperty()
    scoreboardName!: string;

    @ManyToOne()
    @ApiProperty({ type: "string", format: "uuid" })
    user!: User;
}
