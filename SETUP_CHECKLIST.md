# Setup Checklist

Use this checklist to verify your Supabase setup is complete.

## ✅ Environment Variables

- [x] `.env` file created
- [x] `VITE_SUPABASE_URL` set to: `https://inmosvkemazrviwoziii.supabase.co`
- [x] `VITE_SUPABASE_ANON_KEY` set (using publishable key)

## 📋 Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Database Migrations

**In Supabase Dashboard:**

1. Go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"
6. Repeat for `supabase/migrations/002_initial_quests.sql`

**Verify tables were created:**
- Go to **Table Editor** (left sidebar)
- You should see these tables:
  - `user_profiles`
  - `subject_progress`
  - `achievements`
  - `daily_quests`

### 3. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/**`
4. (Optional) Disable email confirmation for testing:
   - Go to **Authentication** → **Providers** → **Email**
   - Toggle "Confirm email" to OFF (for development only)

### 4. Test the Application

```bash
npm run dev
```

1. Open `http://localhost:3000`
2. You should see the authentication page
3. Click "Créer un compte" (Create account)
4. Fill in:
   - Name
   - Email
   - Password (min 6 characters)
5. Click "Créer un compte"
6. If email confirmation is disabled, you'll be logged in immediately
7. You should see the dashboard

### 5. Verify Data is Saving

1. Complete a lesson or activity
2. Check Supabase dashboard:
   - Go to **Table Editor** → `user_profiles`
   - You should see your user with XP, level, etc.
   - Go to `subject_progress` to see lesson completions

## 🔍 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file is in the project root
- Restart the dev server after creating `.env`
- Check that variables start with `VITE_`

### "relation does not exist" or "table not found"
- Run the SQL migrations (Step 2 above)
- Check that migrations ran successfully

### "Invalid API key"
- Verify you're using the **anon/publishable** key, not the secret key
- Check the key in Supabase Dashboard → Settings → API

### Authentication not working
- Check Site URL and Redirect URLs in Auth settings
- Verify email provider is enabled
- Check browser console for errors

### Can't see my data in Supabase
- Check Row Level Security (RLS) is enabled
- Verify you're logged in as the correct user
- Check browser console for errors

## ✨ You're Ready!

Once all steps are complete, your app is fully connected to Supabase and ready to use!

