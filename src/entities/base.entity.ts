import { PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export abstract class BaseEntity {
    @PrimaryKey({ type: "uuid" })
    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;

    @Property()
    @ApiProperty({ type: "string", format: "date-time" })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    @ApiProperty({ type: "string", format: "date-time" })
    updatedAt = new Date();
}
