import { AuthSession, UserCredentials } from '@supabase/supabase-js'
import axios from 'axios'

import { supabase } from '@/lib'
import { API_ENDPOINT } from '@/config'

export const signInWithEmailPassword = async (data: UserCredentials) => {
  const { session, error } = await supabase.auth.signIn(data)
  if (error) {
    throw new Error(error.message)
  }

  return session
}

export const signInWithGoogle = async () => {
  const { session, error } = await supabase.auth.signIn({ provider: 'google' })
  if (error) {
    throw new Error(error.message)
  }

  return session
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export const resetUserPassword = async (email: string) => {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: '/update-password',
  })
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

export const setAuthCookie = (data: AuthSession) =>
  axios({
    url: API_ENDPOINT.AUTH.SET_COOKIE,
    method: 'POST',
    data,
  })

export const getUserByCookie = async () => {
  const { data } = await axios({
    url: API_ENDPOINT.AUTH.GET_USER_VIA_COOKIE,
    method: 'GET',
  })

  return data
}
