import { ApiProperty } from "@nestjs/swagger";

export class CreateBoerenbridgeGame {
    @ApiProperty()
    pointsPerCorrectGuess: number;
}
