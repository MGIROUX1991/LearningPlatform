-- User favorites table
-- Allows users to star/favorite modules and lessons for quick access
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'subject' or 'lesson'
  item_id TEXT NOT NULL, -- subject_id (e.g., 'history', 'math') or lesson UUID
  item_name TEXT NOT NULL, -- Display name for the item
  item_path TEXT NOT NULL, -- Path to navigate to (e.g., '/history', '/math')
  item_icon TEXT, -- Icon identifier or emoji
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_favorites
-- Users can only see their own favorites
CREATE POLICY "Users can view their own favorites"
  ON public.user_favorites FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own favorites
CREATE POLICY "Users can create their own favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON public.user_favorites FOR DELETE
  USING (user_id = auth.uid());

-- Index for faster lookups
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_item ON public.user_favorites(item_type, item_id);

