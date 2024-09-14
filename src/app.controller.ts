import { Controller, Get, HttpCode } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./auth/isPublic";

@Controller()
@ApiTags("root")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @HttpCode(200)
    @Public()
    getHealth(): string {
        return "This app is very healthy! 🥦🥬";
    }
}
