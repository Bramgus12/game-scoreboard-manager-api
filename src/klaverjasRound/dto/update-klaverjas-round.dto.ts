import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UpdateKlaverjasRound {
    @ApiProperty({ type: "string", format: "uuid" })
    id: UUID;

    @ApiProperty()
    roundNumber: number;

    @ApiProperty()
    points: number;

    @ApiProperty()
    fame: number;

    @ApiProperty()
    isPit: boolean;

    @ApiProperty()
    isWet: boolean;

    @ApiProperty()
    isGoing: boolean;
}
