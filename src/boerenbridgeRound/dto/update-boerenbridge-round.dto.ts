import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UpdateBoerenbridgeRound {
    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;

    @ApiProperty()
    roundNumber: number;

    @ApiProperty()
    guess: number;

    @ApiProperty()
    isCorrect: boolean;

    @ApiProperty()
    penaltyPoints?: number;
}
