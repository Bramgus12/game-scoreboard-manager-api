import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class UserModule {}
