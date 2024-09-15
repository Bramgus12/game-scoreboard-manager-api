import { ApiProperty } from "@nestjs/swagger";
import { KLAVERJAS_TEAM_TYPE } from "../../constants/klaverjasTeamType";
import { KlaverjasTeamType } from "../../enums/klaverjasTeamType";
import { UUID } from "crypto";

export class UpdateKlaverjasTeam {
    @ApiProperty({ enum: Object.values(KLAVERJAS_TEAM_TYPE) })
    type!: KlaverjasTeamType;

    @ApiProperty()
    name!: string;

    @ApiProperty({ type: "string", format: "uuid" })
    id!: UUID;
}
