# Production Troubleshooting Guide

## Dashboard Stuck on Loading

If the dashboard is stuck on "Chargement..." in production, check these:

### 1. Environment Variables in Vercel

**Check:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify both variables are set:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

**Fix:**
- Add missing variables
- **Redeploy** after adding (Vercel doesn't auto-redeploy when env vars change)

### 2. Database Tables Not Created

**Check:**
- Open browser console (F12) on production site
- Look for errors like: "relation does not exist" or "table does not exist"

**Fix:**
- Go to Supabase Dashboard → SQL Editor
- Run migrations:
  1. `supabase/migrations/001_initial_schema.sql`
  2. `supabase/migrations/002_initial_quests.sql`

### 3. Supabase Connection Issues

**Check:**
- Browser console for connection errors
- Network tab for failed requests to Supabase

**Fix:**
- Verify Supabase project is active
- Check Supabase status page
- Verify API keys are correct

### 4. CORS Issues

**Check:**
- Browser console for CORS errors

**Fix:**
- Go to Supabase Dashboard → Settings → API
- Add your Vercel domain to "Allowed Origins"
- Format: `https://your-app.vercel.app`

### 5. Row Level Security (RLS)

**Check:**
- If you can log in but data doesn't load, RLS might be blocking

**Fix:**
- Verify RLS policies are enabled in Supabase
- Check that policies allow authenticated users to read their own data

## Quick Diagnostic Steps

1. **Check Browser Console:**
   - Open production site
   - Press F12 → Console tab
   - Look for red errors
   - Share errors for debugging

2. **Check Network Tab:**
   - F12 → Network tab
   - Look for failed requests (red)
   - Check if Supabase requests are failing

3. **Verify Environment Variables:**
   ```bash
   # In Vercel, check that these show your actual values (not undefined):
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-key-here
   ```

4. **Test Supabase Connection:**
   - Go to Supabase Dashboard
   - Check if project is active
   - Verify tables exist in Table Editor

## Common Error Messages

### "Missing Supabase environment variables"
- **Fix:** Add env vars in Vercel and redeploy

### "relation does not exist"
- **Fix:** Run database migrations

### "Failed to fetch" or Network errors
- **Fix:** Check CORS settings, verify Supabase URL

### "Invalid API key"
- **Fix:** Verify you're using the **anon** key, not secret key

## Fallback Behavior

The app now includes fallbacks:
- If database tables don't exist, app continues with default data
- If connection fails, loading state times out after 15 seconds
- Error boundaries catch crashes and show error page

## Still Stuck?

1. Check browser console on production site
2. Share the error messages you see
3. Verify:
   - Environment variables are set in Vercel
   - Database migrations are run
   - Supabase project is active

