import { Module } from "@nestjs/common";
import { KlaverjasRoundService } from "./klaverjas-round.service";

@Module({
    providers: [KlaverjasRoundService],
})
export class KlaverjasRoundModule {}
