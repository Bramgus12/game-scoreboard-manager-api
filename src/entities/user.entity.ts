import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { DomainUserDto } from "user/dto/domain-user.dto";

@Entity()
export class User {
    constructor(user: DomainUserDto, id: UUID) {
        this.id = id;
        this.externalId = user.externalId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }

    @PrimaryKey({ type: "uuid" })
    @ApiProperty()
    id!: UUID;

    @ApiProperty()
    @Property()
    externalId!: UUID;

    @ApiProperty()
    @Property()
    firstName!: string;

    @ApiProperty()
    @Property()
    lastName!: string;

    @ApiProperty()
    @Property()
    email!: string;
}
