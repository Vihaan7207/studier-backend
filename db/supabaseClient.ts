import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { config } from 'dotenv';
config();

let supabaseUrl: string | undefined;
let supabaseKey: string | undefined;

supabaseUrl = process.env.SUPABASE_URL;
supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient<Database>( supabaseUrl as string, supabaseKey as string );

export default supabase;