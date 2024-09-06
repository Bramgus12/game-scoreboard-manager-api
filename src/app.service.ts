import { Injectable } from "@nestjs/common";
import { UserResponse } from "@supabase/supabase-js";
import { auth } from "auth/auth";

@Injectable()
export class AppService {
    getHello(): string {
        return "Hello World!";
    }

    getUser(authToken: string): Promise<UserResponse> {
        return auth.auth.getUser(authToken);
    }
}
