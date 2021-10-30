import { AuthSession } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { SessionContextState, SessionProviderProps } from './types'
import { supabase } from '@/lib'
import { setAuthCookie } from '@/features/auth/api'

const state: SessionContextState = {
  session: null,
}

const SessionContext = createContext(state)

export const SessionProvider = (props: SessionProviderProps) => {
  const [session, setSession] = useState<AuthSession | null>(state.session)

  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.session()
    if (session) {
      setSession(session)
    }

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        router.push('/update_password')
      }

      if (event === 'USER_UPDATED') {
        router.push('/')
      }

      setAuthCookie(event, session)

      setSession(session)
    })

    return () => {
      data?.unsubscribe()
    }
  }, [router])

  const value = {
    session,
  }

  return <SessionContext.Provider value={value} {...props} />
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useSession must be used within a <SessionProvider />`)
  }

  return context
}
