import { ApiProperty } from "@nestjs/swagger";

export class CreateKlaverjasRound {
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
}
