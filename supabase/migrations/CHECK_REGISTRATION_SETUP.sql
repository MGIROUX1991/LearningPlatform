-- Diagnostic script to check if registration trigger is set up correctly
-- Run this in your Supabase SQL editor to verify the setup

-- 1. Check if the trigger function exists
SELECT 
  proname as function_name,
  prosrc as function_body
FROM pg_proc
WHERE proname = 'handle_new_user';

-- 2. Check if the trigger exists
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  tgenabled as enabled
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- 3. Check RLS policies on user_profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'user_profiles';

-- 4. Test the trigger function manually (replace with a test UUID)
-- This will help identify if the trigger function itself works
-- DO NOT run this with a real user ID unless you want to create a duplicate profile
/*
DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000000'::UUID;
BEGIN
  -- Try to insert a test profile (this will fail if trigger logic is wrong)
  INSERT INTO public.user_profiles (id, name, level, xp, streak)
  VALUES (test_user_id, 'Test User', 1, 0, 0)
  ON CONFLICT (id) DO NOTHING;
  
  RAISE NOTICE 'Trigger function test completed';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error: %', SQLERRM;
END $$;
*/

-- 5. Check if there are any existing profiles (to verify trigger has worked before)
SELECT COUNT(*) as total_profiles FROM public.user_profiles;

-- 6. Verify the trigger function has SECURITY DEFINER
SELECT 
  p.proname as function_name,
  CASE 
    WHEN p.prosecdef THEN 'SECURITY DEFINER'
    ELSE 'SECURITY INVOKER'
  END as security_type
FROM pg_proc p
WHERE p.proname = 'handle_new_user';

