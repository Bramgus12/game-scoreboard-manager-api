import { ApiProperty } from "@nestjs/swagger";

export class CreateScoreboardDto {
    @ApiProperty()
    scoreboardName: string;
}
