import { createClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private configService: ConfigService) {}

    getAuthObject() {
        const supabaseUrl = this.configService.get<string>("SUPABASE_PROJECT_URL");
        const supabaseServiceRoleKey = this.configService.get<string>("SUPABASE_SERVICE_ROLE_KEY");

        if (supabaseUrl == null || supabaseServiceRoleKey == null) {
            throw new Error("Missing environment variables SUPABASE_PROJECT_URL and/or SUPABASE_SERVICE_ROLE_KEY");
        }

        return createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }

    public supabase = this.getAuthObject();
}
