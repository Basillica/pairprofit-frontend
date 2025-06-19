import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseHandler {
    redirectUrl = "link-to-app";

    getClient(): SupabaseClient<any, "public", any> {
        const envvar = import.meta.env.VITE_SUPABASE_ENV_VARIABLE || "";
        const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL || ""
        return createClient(project_url, envvar);
    }
}
