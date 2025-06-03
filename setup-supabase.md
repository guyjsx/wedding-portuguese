# Supabase Setup Instructions

## To apply the database migration:

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/20250206_create_progress_table.sql`
4. Click "Run" to execute the migration

## Enable Authentication:

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable "Email" provider (should be enabled by default)
3. Configure email settings if needed

## What this creates:

- A `progress` table that stores:
  - `user_id`: Links to authenticated users
  - `missions`: JSON object storing completed missions
  - `points`: Total points earned
  - Timestamps for tracking when progress was created/updated
- Row Level Security (RLS) so users can only access their own progress
- Automatic updated_at timestamp updates

## Progress Persistence Features:

1. **Local Storage**: Progress is always saved locally first
2. **Supabase Sync**: If authenticated, progress syncs to the cloud
3. **Cross-Device**: Access your progress from any device when logged in
4. **Offline Support**: Works offline with localStorage, syncs when online

## Authentication (Optional):

To enable cloud sync, you'll need to implement authentication. The app will work without it using just localStorage.