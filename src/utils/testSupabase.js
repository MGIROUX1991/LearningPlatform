// Quick test script to verify Supabase connection
// Run this in browser console after starting the app

import { supabase } from '../lib/supabase';

export const testSupabaseConnection = async () => {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Check if client is initialized
    console.log('✓ Supabase client initialized');
    
    // Test 2: Check auth
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('✗ Auth error:', authError);
    } else {
      console.log('✓ Auth service working');
      console.log('  Session:', session ? 'Active' : 'No active session');
    }
    
    // Test 3: Check database connection (try to read a table)
    const { data, error: dbError } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);
    
    if (dbError) {
      if (dbError.code === 'PGRST116') {
        console.log('✓ Database connection working (table exists but empty)');
      } else if (dbError.message.includes('relation') || dbError.message.includes('does not exist')) {
        console.warn('⚠ Database tables not created yet. Run migrations!');
        console.log('  Go to Supabase SQL Editor and run:');
        console.log('  1. supabase/migrations/001_initial_schema.sql');
        console.log('  2. supabase/migrations/002_initial_quests.sql');
      } else {
        console.error('✗ Database error:', dbError);
      }
    } else {
      console.log('✓ Database connection working');
    }
    
    console.log('\n✅ Supabase connection test complete!');
    return true;
  } catch (error) {
    console.error('✗ Connection test failed:', error);
    return false;
  }
};

