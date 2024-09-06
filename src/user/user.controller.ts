import { Body, Controller, Get, NotFoundException, Post, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { RequestWithAuthUser } from "types/requestWithUser";
import { ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateUpdateUserDto } from "./dto/create-update-user.dto";
import { DomainUserDto } from "./dto/domain-user.dto";
import { UUID } from "crypto";
import { User } from "entities/user.entity";

@Controller("user")
@ApiSecurity("bearer")
@ApiTags("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    @ApiResponse({ status: 200, type: User })
    async getUser(@Request() req: RequestWithAuthUser): Promise<User> {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        const user = await this.userService.getUser(req.user.id as UUID);

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    @Post("/")
    @ApiResponse({ status: 201, type: User })
    createUser(@Request() req: RequestWithAuthUser, @Body() user: CreateUpdateUserDto) {
        if (req.user == null) {
            throw new NotFoundException("User not found");
        }

        if (req.user.email == null) {
            throw new NotFoundException("No email found inside of auth user object");
        }

        const noIdUser: DomainUserDto = {
            ...user,
            email: req.user.email,
            externalId: req.user.id as UUID,
        };

        return this.userService.createUser(noIdUser);
    }

    @Put("/")
    @ApiResponse({ status: 200, type: User })
    async updateUser(@Request() req: RequestWithAuthUser, @Body() user: CreateUpdateUserDto) {
        if (req.user == null) {
            throw new NotFoundException("Auth User not found");
        }

        return this.userService.updateUser(req.user.id as UUID, user);
    }
}
