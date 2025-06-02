// types/supabase.ts
export interface Database {
    public: {
      Tables: {
        progress: {
          Row: {
            id: string
            user_id: string
            missions: Record<string, any>
            points: number
            streak: number
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            user_id: string
            missions?: Record<string, any>
            points?: number
            streak?: number
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            user_id?: string
            missions?: Record<string, any>
            points?: number
            streak?: number
            created_at?: string
            updated_at?: string
          }
        }
      }
    }
  }