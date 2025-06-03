# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev       # Start development server at http://localhost:3000 (uses Turbopack)
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture Overview

This is a Next.js 15.3.3 application using the App Router pattern, designed as a mobile-first PWA for learning Portuguese phrases for a Brazilian wedding.

### Core Technologies
- **Frontend**: Next.js with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Database**: Supabase (configured but not fully integrated)
- **Deployment**: Optimized for Vercel

### Application Structure

The entire application logic lives in `app/page.tsx` as a single-page application with:
- 5-day structured learning curriculum
- Daily missions with specific Portuguese phrases
- Gamification with points system (10 points per completed mission)
- Progress tracking using localStorage
- External tool integrations (Forvo, Speechling, HelloTalk, etc.)

### Key Implementation Details

1. **State Management**: React hooks (useState, useEffect) with localStorage persistence
2. **Progress Tracking**: 
   - `completedDays`: Array of completed day numbers
   - `completedMissions`: Array of unique mission IDs (format: "day-missionIndex")
   - `totalPoints`: Cumulative score
3. **Mobile Optimizations**:
   - PWA manifest and service worker support
   - Touch-friendly targets (minimum 48px)
   - Viewport optimizations
   - High contrast for outdoor visibility

### Supabase Integration

Database types are defined in `types/supabase.ts` with tables for:
- `profiles`: User information linked to auth.users
- `progress`: User progress tracking
- `achievements`: Unlocked achievements

The Supabase client is initialized in `lib/supabase.ts` but currently inactive in the main application.

### Style Patterns

- Dark theme with high contrast (#0a0a0a background, white text)
- Consistent spacing: gap-4/6/8 for layouts
- Button styles: rounded-lg with px-6 py-3 padding
- Responsive design with mobile-first approach