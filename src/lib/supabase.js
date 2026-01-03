import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗');
  console.error('Make sure your .env file exists and contains both variables');
  console.error('Current .env values:', {
    url: supabaseUrl || 'MISSING',
    key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING',
  });
}

// Create client (will fail gracefully if env vars are missing)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // Use default storage (localStorage) with auto-generated key based on project URL
    },
  },
);

if (supabaseUrl && supabaseAnonKey) {
  console.log('✓ Supabase client initialized');
}

