import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types'

const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export function createClient() {
  return supabase
}

export { supabase };

