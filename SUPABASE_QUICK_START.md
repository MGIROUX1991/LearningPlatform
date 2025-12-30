# Supabase Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project
- Go to [app.supabase.com](https://app.supabase.com)
- Click "New Project"
- Fill in project details
- Wait for project to initialize

### 2. Get API Keys
- Go to **Settings** → **API**
- Copy **Project URL** and **anon key**

### 3. Create `.env` File
Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with your actual values.

### 4. Run Database Migrations
In Supabase dashboard → **SQL Editor**:

1. Run `supabase/migrations/001_initial_schema.sql`
2. Run `supabase/migrations/002_initial_quests.sql`

### 5. Configure Auth
- Go to **Authentication** → **Settings**
- Add `http://localhost:3000` to Site URL
- Add `http://localhost:3000/**` to Redirect URLs

### 6. Install & Run
```bash
npm install
npm run dev
```

### 7. Test
- Navigate to `http://localhost:3000`
- Create an account
- Start learning!

## 📁 Files Created

- `src/lib/supabase.js` - Supabase client
- `src/context/SupabaseContext.jsx` - Auth context
- `src/services/dataService.js` - Data operations
- `src/components/Auth.jsx` - Login/signup component
- `supabase/migrations/` - Database schema

## 🔐 Security

- RLS (Row Level Security) enabled on all tables
- Users can only access their own data
- `anon` key is safe for client-side use

## 📚 Full Documentation

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

