import { ApiProperty } from "@nestjs/swagger";
import { KLAVERJAS_TEAM_TYPE } from "../../constants/klaverjasTeamType";
import { KlaverjasTeamType } from "../../enums/klaverjasTeamType";

export class CreateKlaverjasTeam {
    @ApiProperty({ enum: Object.values(KLAVERJAS_TEAM_TYPE) })
    type!: KlaverjasTeamType;

    @ApiProperty()
    name!: string;
}
