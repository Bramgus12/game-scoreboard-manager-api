import { ApiProperty } from "@nestjs/swagger";
import { GameType } from "../../enums/gameType";

export class CreateScoreboardDto {
    @ApiProperty()
    scoreboardName!: string;

    @ApiProperty()
    gameType: GameType;
}
