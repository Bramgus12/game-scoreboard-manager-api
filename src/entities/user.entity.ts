import { Entity, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
    @ApiProperty({ type: "string", format: "uuid" })
    @Property()
    externalId!: UUID;

    @ApiProperty()
    @Property()
    firstName!: string;

    @ApiProperty()
    @Property()
    lastName!: string;

    @ApiProperty({ type: "string", format: "email" })
    @Property()
    email!: string;
}
