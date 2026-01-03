-- Add school year and competencies fields to lessons table
-- This allows proper organization of lessons by grade level and curriculum competencies

ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS school_year TEXT,
ADD COLUMN IF NOT EXISTS competencies TEXT[] DEFAULT '{}';

-- Add index for faster filtering by school year
CREATE INDEX IF NOT EXISTS idx_lessons_school_year ON public.lessons(school_year);
CREATE INDEX IF NOT EXISTS idx_lessons_competencies ON public.lessons USING GIN(competencies);

-- Add comment for documentation
COMMENT ON COLUMN public.lessons.school_year IS 'School year level: Secondary I, Secondary II, Secondary III, Secondary IV, or Secondary V';
COMMENT ON COLUMN public.lessons.competencies IS 'Array of competency IDs that this lesson addresses (e.g., ["reading", "writing"] for French)';

