import { Module } from "@nestjs/common";
import { BoerenbridgePlayerService } from "./boerenbridge-player.service";
import { BoerenbridgePlayerController } from "./boerenbridge-player.controller";

@Module({
    providers: [BoerenbridgePlayerService],
    controllers: [BoerenbridgePlayerController],
})
export class BoerenbridgePlayerModule {}
