import { Body, Controller, Get, NotFoundException, Post, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { RequestWithAuthUser } from "../types/requestWithUser";
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateUpdateUserDto } from "./dto/create-update-user.dto";
import { DomainUserDto } from "./dto/domain-user.dto";
import { UUID } from "crypto";
import { User } from "../entities/user.entity";

@Controller("user")
@ApiSecurity("bearer")
@ApiTags("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    @ApiResponse({ status: 200, type: User })
    getUser(@Request() req: RequestWithAuthUser): User {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        return req.user;
    }

    @Post("/")
    @ApiResponse({ status: 201, type: User })
    createUser(@Request() req: RequestWithAuthUser, @Body() user: CreateUpdateUserDto) {
        if (req.authUser == null) {
            throw new NotFoundException("User not found");
        }

        if (req.authUser.email == null) {
            throw new NotFoundException("No email found inside of auth user object");
        }

        const noIdUser: DomainUserDto = {
            ...user,
            email: req.authUser.email,
            externalId: req.authUser.id as UUID,
        };

        return this.userService.createUser(noIdUser);
    }

    @Put("/")
    @ApiResponse({ status: 200, type: User })
    async updateUser(@Request() req: RequestWithAuthUser, @Body() user: CreateUpdateUserDto) {
        if (req.user == null) {
            throw new NotFoundException("AuthService User not found");
        }

        return this.userService.updateUser(req.user.externalId, user);
    }
}
