import { NextApiRequest, NextApiResponse } from 'next'
import { AuthUser } from '@supabase/supabase-js'

import { supabase } from '@/lib'

interface Data {
  user: AuthUser | null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { user, error } = await supabase.auth.api.getUserByCookie(req)
  if (error) {
    throw new Error(error.message)
  }

  res.json({ user })
}
