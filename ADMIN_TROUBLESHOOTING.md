# Admin Access Troubleshooting

## Issue: "Admin" link not showing in navigation

### Step 1: Verify Database Setup

1. **Check if migration was run:**
   - Go to Supabase Dashboard → Table Editor
   - Look for `admin_users` table
   - If it doesn't exist, run `supabase/migrations/003_admin_and_content.sql`

### Step 2: Verify Admin Entry

Run this SQL in Supabase SQL Editor to check if you're in the admin_users table:

```sql
SELECT * FROM public.admin_users;
```

If you see your user ID, proceed to Step 3.
If you don't see your user ID, add yourself:

```sql
-- First, get your user ID
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- Then insert yourself as admin (replace USER_ID with the ID from above)
INSERT INTO public.admin_users (id, email, role)
VALUES ('USER_ID_HERE', 'your@email.com', 'admin');
```

### Step 3: Check RLS Policies

The RLS policy should allow users to check their own admin status. Verify:

```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'admin_users';
```

You should see:
- "Users can check their own admin status" (SELECT)
- "Admins can view all admins" (SELECT)

### Step 4: Use Debug Tool

1. Go to `/settings` page
2. Scroll to "Debug Admin Status" section
3. Click "Manual Check" to test database query
4. Click "Refresh Context" to update the UI
5. Check browser console (F12) for any errors

### Step 5: Common Issues

**Issue: "relation admin_users does not exist"**
- **Fix:** Run migration `003_admin_and_content.sql`

**Issue: "permission denied for table admin_users"**
- **Fix:** Check RLS policies are enabled and correct

**Issue: Query returns no rows**
- **Fix:** Verify your user ID matches exactly in admin_users table
- Check: `SELECT * FROM admin_users WHERE id = 'YOUR_USER_ID';`

**Issue: Context shows false but database shows true**
- **Fix:** Click "Refresh Context" button or log out and back in

### Step 6: Manual Verification

Run this in Supabase SQL Editor to verify everything:

```sql
-- Check your user
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- Check if you're an admin (replace USER_ID)
SELECT * FROM admin_users WHERE id = 'USER_ID';

-- Test the query the app uses
SELECT id, email, role 
FROM admin_users 
WHERE id = 'USER_ID' 
LIMIT 1;
```

### Step 7: Force Refresh

1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Log out and log back in
4. Check admin status again

## Still Not Working?

1. Check browser console for errors
2. Verify Supabase project is active
3. Check network tab for failed requests
4. Ensure you're using the correct Supabase project (check .env file)

## Quick Fix Script

If you want to quickly add yourself as admin:

```sql
-- This will add your current logged-in user as admin
-- Run this in Supabase SQL Editor while logged in
INSERT INTO public.admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your@email.com'
ON CONFLICT (id) DO NOTHING;
```

