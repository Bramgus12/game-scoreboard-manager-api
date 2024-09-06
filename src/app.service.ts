import { Injectable } from "@nestjs/common";
import { UserResponse } from "@supabase/supabase-js";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class AppService {
    constructor(private authService: AuthService) {}

    getHello(): string {
        return "Hello World!";
    }

    getUser(authToken: string): Promise<UserResponse> {
        return this.authService.supabase.auth.getUser(authToken);
    }
}
