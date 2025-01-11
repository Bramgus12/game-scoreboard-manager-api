import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UpdateBoerenbridgePlayer {
    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;

    @ApiProperty()
    name: string;
}
