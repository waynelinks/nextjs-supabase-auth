import { UserCredentials } from '@supabase/supabase-js'

import { supabase } from '@/lib'

export const signInLocal = async (data: UserCredentials) => {
  const { session, error } = await supabase.auth.signIn(data)
  if (error) {
    throw new Error(error.message)
  }

  return session
}
