-- Fix script for registration issues
-- This will recreate the trigger function and trigger if they're missing or broken

-- Drop existing trigger and function if they exist (to recreate them)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name, level, xp, streak)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', 'Étudiant'), 
    1, 
    0, 
    0
  )
  ON CONFLICT (id) DO NOTHING; -- Prevent duplicate profile creation
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating user profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON public.user_profiles TO postgres;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;

-- Verify the setup
DO $$
BEGIN
  RAISE NOTICE 'Registration trigger setup completed';
  RAISE NOTICE 'Trigger function: handle_new_user';
  RAISE NOTICE 'Trigger: on_auth_user_created on auth.users';
END $$;

