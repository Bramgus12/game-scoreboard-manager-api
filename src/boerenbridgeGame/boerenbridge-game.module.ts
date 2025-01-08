import { Module } from "@nestjs/common";
import { BoerenbridgeGameService } from "./boerenbridge-game.service";
import { BoerenbridgeGameController } from "./boerenbridge-game.controller";

@Module({
    providers: [BoerenbridgeGameService],
    controllers: [BoerenbridgeGameController],
})
export class BoerenbridgeGameModule {}
