# Lesson Migration Guide

## Overview

All existing hardcoded lessons have been migrated to the database, allowing admins to manage lesson content through the admin interface.

## What Was Done

### 1. Database Migration
- **File**: `supabase/migrations/005_migrate_existing_lessons.sql`
- Migrates all 5 history chapters from hardcoded content to the database
- Uses `ON CONFLICT DO NOTHING` to prevent duplicates if run multiple times

### 2. Component Updates
- **File**: `src/pages/history/HistoryLesson.jsx`
- Updated to load lessons from the database
- Falls back to hardcoded content if database lesson doesn't exist
- Converts database format (single text field) to component format (pages array)

## How to Run the Migration

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the migration file: `supabase/migrations/005_migrate_existing_lessons.sql`

This will insert all 5 history lessons:
- Chapter 1: Les Grands Explorateurs
- Chapter 2: La Traversée
- Chapter 3: Fondation de Québec
- Chapter 4: La Vie Quotidienne
- Chapter 5: Relations avec les Autochtones

## How It Works

### Database Structure
Lessons are stored in the `lessons` table with:
- `subject_id`: 'history', 'math', etc.
- `chapter_id`: 'chapter1', 'chapter2', etc.
- `lesson_number`: Sequential number (usually 1)
- `title`: Lesson title
- `content`: Main lesson text (split into pages by double newlines)
- `fun_fact`: Optional fun fact
- `vocabulary`: JSONB object with vocabulary terms
- `quiz`: JSONB object with quiz questions
- `xp_reward`: XP points for completing

### Component Loading
1. Component tries to load lesson from database using `lessonService.getLessons()`
2. If found, converts database format to component format:
   - Splits content by double newlines (`\n\n`) to create pages
   - Adds fun_fact to first page
   - Adds vocabulary to second page
3. If not found, falls back to hardcoded content (for backward compatibility)

## Managing Lessons

Admins can now:
- View all lessons in `/admin/lessons`
- Create new lessons
- Edit existing lessons
- Delete lessons
- Filter by subject and chapter

## Future Improvements

1. **Better Page Structure**: Consider storing pages as JSONB array instead of splitting text
2. **Math Lessons**: Math currently uses practice problems, not lessons. Could be migrated similarly
3. **Rich Content**: Support for images, videos, and interactive elements in lessons
4. **Version Control**: Track lesson changes over time

## Notes

- The migration is idempotent (safe to run multiple times)
- Existing hardcoded content remains as fallback
- All lessons are publicly readable (RLS policy allows SELECT for everyone)
- Only admins can create/update/delete lessons

