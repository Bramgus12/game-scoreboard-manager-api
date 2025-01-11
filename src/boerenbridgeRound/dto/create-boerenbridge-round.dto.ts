import { ApiProperty } from "@nestjs/swagger";

export class CreateBoerenbridgeRound {
    @ApiProperty()
    roundNumber: number;

    @ApiProperty()
    guess: number;

    @ApiProperty()
    isCorrect: boolean;

    @ApiProperty()
    penaltyPoints?: number;
}
