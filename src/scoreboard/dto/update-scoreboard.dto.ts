import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UpdateScoreboardDto {
    @ApiProperty()
    scoreboardName!: string;

    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;
}
