import { Module } from "@nestjs/common";
import { KlaverjasTeamService } from "./klaverjas-team.service";

@Module({
    providers: [KlaverjasTeamService],
})
export class KlaverjasTeamModule {}
