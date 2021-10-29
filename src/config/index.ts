export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const API_ENDPOINT = {
  AUTH: {
    SET_COOKIE: '/api/auth',
    GET_USER_VIA_COOKIE: '/api/getUser',
  }
}