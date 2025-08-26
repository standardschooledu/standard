'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { session, loading } = useAuth()

  useEffect(() => {
    async function checkUserRole() {
      if (
        session &&
        session.user.user_metadata.user_type === 'teachers'
      ) {
        const { data, error } = await supabase
          .from('teachers')
          .select('user_id')
          .eq('user_id', session.user.id)
          .single()

        if (error || !data) {
          console.error(error)
          router.replace('/teacher/form')
          return
        }
        if (!pathname.startsWith('/teacher')) {
          router.replace('/teacher')
          return
        }
      } else if (
        session &&
        session.user.user_metadata.user_type === 'admin' &&
        !pathname.startsWith('/admin')
      ) {
        router.replace('/admin')
        return
      } else if (!session && pathname !== '/login') {
        router.replace('/login')
      } else if (session && pathname === '/login') {
        router.replace('/admin')
      }
    }

    if (!loading) {
      checkUserRole()
    }
  }, [session, loading, pathname, router])

  if (
    loading ||
    (!session && pathname !== '/login') ||
    (session && pathname === '/login')
  ) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return <>{children}</>
}
