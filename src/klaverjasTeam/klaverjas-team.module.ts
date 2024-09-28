import { Module } from "@nestjs/common";
import { KlaverjasTeamService } from "./klaverjas-team.service";
import { KlaverjasTeamController } from "./klaverjas-team.controller";

@Module({
    providers: [KlaverjasTeamService],
    controllers: [KlaverjasTeamController],
})
export class KlaverjasTeamModule {}
