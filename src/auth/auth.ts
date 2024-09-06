import { createClient } from "@supabase/supabase-js";

const supabase_url = "empty-url";
const service_role_key = "empty-key";

export const auth = createClient(supabase_url, service_role_key, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
