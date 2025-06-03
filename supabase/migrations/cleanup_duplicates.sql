-- Cleanup duplicate progress records
-- This keeps only the record with the most points for each user

-- First, identify and keep only the record with most progress for each user
DELETE FROM public.progress
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM public.progress
  ORDER BY user_id, points DESC, updated_at DESC
);

-- Now ensure the unique constraint is properly enforced
-- Drop existing constraint if it exists
ALTER TABLE public.progress DROP CONSTRAINT IF EXISTS progress_user_id_key;

-- Add the unique constraint back
ALTER TABLE public.progress ADD CONSTRAINT progress_user_id_key UNIQUE (user_id);