-- Cleanup duplicate progress records
-- This keeps only the most recent progress record for each user

-- First, identify and keep only the most recent record for each user
DELETE FROM public.progress
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM public.progress
  ORDER BY user_id, updated_at DESC
);