import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a robust client that defaults to empty strings if env is missing to prevent breaking dev server
export const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : {
        from: () => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: 'No Env' }), order: () => Promise.resolve({ data: [], error: 'No Env' }) }), count: () => Promise.resolve({ count: 0, error: 'No Env' }), order: () => Promise.resolve({ data: [], error: 'No Env' }) }),
            insert: () => Promise.resolve({ error: 'No Env' }),
            update: () => ({ eq: () => Promise.resolve({ error: 'No Env' }) })
        })
    } as any; // Mock client for unconfigured state
