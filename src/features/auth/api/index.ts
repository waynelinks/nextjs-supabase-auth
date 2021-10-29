import { UserCredentials } from '@supabase/supabase-js'

import { supabase } from '@/lib'

export const signInLocal = async (data: UserCredentials) => {
  const { session, error } = await supabase.auth.signIn(data)
  if (error) {
    throw new Error(error.message)
  }

  return session
}

export const resetUserPassword = async (email: string) => {
  const { data, error} = await supabase.auth.api.resetPasswordForEmail(email, { redirectTo: '/update-password'})
  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateUserPassword = async (password: string) => {
  const { data, error } = await supabase.auth.update({ password })
  if (error) {
    throw new Error(error.message)
  }

  return data
}
