import { createClient } from '@supabase/supabase-js'


export const supabaseAdmin = createClient(
  `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co`,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)