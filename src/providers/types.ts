import { AuthSession } from '@supabase/supabase-js';

export interface SessionContextState {
  session: AuthSession | null
}

export type SessionProviderProps = {
  children: React.ReactNode
  session?: AuthSession | null
}