import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { RequestWithAuthUser } from "types/requestWithUser";
import { UserService } from "user/user.service";
import { IS_PUBLIC_KEY } from "./isPublic";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private reflector: Reflector,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request: RequestWithAuthUser = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(context.switchToHttp().getRequest());

        if (token == null) {
            throw new UnauthorizedException();
        }

        const user = await this.authService.supabase.auth.getUser(token);

        if (user.error) {
            throw new UnauthorizedException();
        }

        const dbUser = await this.userService.getUser(user.data.user.id);

        if (dbUser == null && request.path === "/user" && request.method === "POST") {
            request["user"] = user.data.user;
            return true;
        }

        if (dbUser == null) {
            throw new NotFoundException("User not found");
        }

        request["user"] = user.data.user;

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
