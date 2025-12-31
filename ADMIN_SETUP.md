# Admin System Setup Guide

## Overview

The admin system allows platform administrators to manage content directly from the platform, starting with lessons.

## Setup Steps

### 1. Run Database Migrations

In Supabase Dashboard → SQL Editor, run:
- `supabase/migrations/003_admin_and_content.sql`

This creates:
- `admin_users` table for admin role management
- `lessons` table for storing lesson content
- RLS policies for security

### 2. Make a User an Admin

To grant admin access to a user, run this SQL in Supabase:

```sql
-- Replace USER_ID with the actual user's UUID from auth.users
-- Replace EMAIL with the user's email
INSERT INTO public.admin_users (id, email, role)
VALUES ('USER_ID_HERE', 'user@example.com', 'admin');
```

To find a user's ID:
1. Go to Supabase Dashboard → Authentication → Users
2. Find the user and copy their UUID
3. Use it in the INSERT statement above

### 3. Access Admin Dashboard

Once a user is marked as admin:
1. Log in with that account
2. Navigate to `/admin` or click "Admin" in the navigation bar
3. You'll see the admin dashboard with modules:
   - **Gestion des leçons** - Manage lessons
   - **Gestion des utilisateurs** - Manage users (coming soon)
   - **Analytiques** - Analytics (coming soon)
   - **Paramètres** - Platform settings (coming soon)

## Features

### Lesson Management

**Location:** `/admin/lessons`

**Features:**
- View all lessons by subject and chapter
- Create new lessons
- Edit existing lessons
- Delete lessons
- Filter by subject and chapter

**Lesson Fields:**
- Subject (History, Math, French, English, Science)
- Chapter (for History)
- Lesson Number
- Title
- Content (main lesson text)
- Fun Fact (optional)
- Vocabulary (key-value pairs)
- Quiz (questions with multiple choice)
- XP Reward

## Security

- Only users in the `admin_users` table can access admin routes
- RLS policies ensure only admins can create/update/delete lessons
- All users can read lessons (for display)
- Admin status is checked on every admin route access

## Adding More Admins

To add more admins, simply insert their user ID into `admin_users`:

```sql
INSERT INTO public.admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'newadmin@example.com';
```

## Next Steps

Future admin features to implement:
- User management (view, edit, delete users)
- Analytics dashboard
- Platform settings
- Content moderation
- Bulk operations

