import { Module } from "@nestjs/common";
import { BoerenbridgeRoundService } from "./boerenbridge-round.service";
import { BoerenbridgeRoundController } from "./boerenbridge-round.controller";

@Module({
    providers: [BoerenbridgeRoundService],
    controllers: [BoerenbridgeRoundController],
})
export class BoerenbridgeRoundModule {}
