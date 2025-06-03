-- Create progress table for storing user progress
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  missions JSONB DEFAULT '{}'::jsonb,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own progress
CREATE POLICY "Users can view own progress" ON public.progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can insert own progress" ON public.progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update own progress" ON public.progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id::uuid)
  WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete own progress" ON public.progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id::uuid);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON public.progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();