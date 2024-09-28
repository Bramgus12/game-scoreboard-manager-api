import { Module } from "@nestjs/common";
import { KlaverjasRoundService } from "./klaverjas-round.service";
import { KlaverjasRoundController } from "./klaverjas-round.controller";

@Module({
    providers: [KlaverjasRoundService],
    controllers: [KlaverjasRoundController],
})
export class KlaverjasRoundModule {}
