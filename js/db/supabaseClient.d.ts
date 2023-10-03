import { Database } from './database.types';
declare const supabase: import("@supabase/supabase-js").SupabaseClient<Database, "public", {
    Tables: {};
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
}>;
export default supabase;
