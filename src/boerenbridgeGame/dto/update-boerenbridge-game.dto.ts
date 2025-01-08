import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UpdateBoerenbridgeGame {
    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;

    @ApiProperty()
    currentRound: number;

    @ApiProperty()
    pointsPerCorrectGuess: number;
}
