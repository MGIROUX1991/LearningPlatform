# Supabase Setup Guide

This guide will help you set up your Quebec Learning Platform with Supabase.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Git (optional, for version control)

## Step 1: Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: quebec-learning-platform (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to initialize (2-3 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   Replace with your actual values from Step 2.

## Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" (or press Ctrl+Enter)
5. Repeat for `supabase/migrations/002_initial_quests.sql`

Alternatively, if you have the Supabase CLI installed:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under "Site URL", add your development URL: `http://localhost:3000`
3. Under "Redirect URLs", add:
   - `http://localhost:3000/**`
   - Your production URL (when ready)

4. (Optional) Configure email templates:
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation and password reset emails

## Step 6: Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase client library
- All other project dependencies

## Step 7: Run the Application

```bash
npm run dev
```

The app should now:
- Connect to Supabase
- Show authentication page
- Allow users to sign up/sign in
- Save progress to Supabase database

## Step 8: Test Authentication

1. Navigate to `http://localhost:3000`
2. You should be redirected to `/auth`
3. Click "Créer un compte" (Create account)
4. Enter:
   - Name
   - Email
   - Password (min 6 characters)
5. Click "Créer un compte"
6. Check your email for confirmation (if email confirmation is enabled)
7. Sign in with your credentials

## Database Schema Overview

### Tables Created

1. **user_profiles**
   - Stores user level, XP, streak
   - Linked to `auth.users`

2. **subject_progress**
   - Tracks progress per subject
   - Stores completed chapters, lessons, skills

3. **achievements**
   - User achievements/badges
   - Links to user profiles

4. **daily_quests**
   - Daily quest tracking
   - Resets daily

### Row Level Security (RLS)

All tables have RLS enabled:
- Users can only access their own data
- Policies are automatically applied

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables (same as Vercel)
7. Deploy!

### Option 3: Supabase Hosting (Coming Soon)

Supabase is working on hosting capabilities. Check their docs for updates.

## Post-Deployment

After deploying:

1. Update Supabase redirect URLs:
   - Go to **Authentication** → **Settings**
   - Add your production URL to "Redirect URLs"

2. Update CORS settings (if needed):
   - Go to **Settings** → **API**
   - Add your domain to allowed origins

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists
- Check that variables start with `VITE_`
- Restart dev server after adding variables

### "Error loading profile"
- Check that migrations ran successfully
- Verify RLS policies are enabled
- Check browser console for specific errors

### Authentication not working
- Verify Site URL in Supabase settings
- Check redirect URLs
- Ensure email confirmation is configured correctly

### Database connection issues
- Verify API keys are correct
- Check Supabase project is active
- Review Supabase dashboard for service status

## Security Notes

- The `anon` key is safe to use in client-side code
- Never commit `.env` file to git
- RLS policies protect user data
- Use service role key only on server-side (not included in this setup)

## Next Steps

1. **Customize Email Templates**: Personalize auth emails
2. **Add Social Auth**: Configure Google/GitHub login
3. **Set Up Backups**: Configure database backups in Supabase
4. **Monitor Usage**: Check Supabase dashboard for usage stats
5. **Add Analytics**: Integrate analytics for user tracking

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

