'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Loading } from './loading'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { session, loading } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    async function checkUserRole() {
      // Block non-teachers from accessing /teacher routes
      if (
        pathname.startsWith('/teacher') &&
        (!session || session.user.user_metadata.user_type !== 'teachers')
      ) {
        router.replace('/login')
        setAuthChecked(false)
        return
      }

      // Teacher access logic
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
          setAuthChecked(false)
          return
        }
        if (!pathname.startsWith('/teacher')) {
          router.replace('/teacher')
          setAuthChecked(false)
          return
        }
      } else if (
        session &&
        session.user.user_metadata.user_type === 'admin' &&
        !pathname.startsWith('/admin')
      ) {
        router.replace('/admin')
        setAuthChecked(false)
        return
      } else if (!session && pathname !== '/login') {
        router.replace('/login')
        setAuthChecked(false)
        return
      } else if (session && pathname === '/login') {
        router.replace('/admin')
        setAuthChecked(false)
        return
      }
      setAuthChecked(true)
    }

    if (!loading) {
      checkUserRole()
    }
  }, [session, loading, pathname, router])

  if (
    loading ||
    !authChecked ||
    (!session && pathname !== '/login') ||
    (session && pathname === '/login')
  ) {
    return <div className='h-[100vh] flex gap-4 items-center justify-center'>
      <Loading type='large' />
      <p>Loading...</p>
    </div>
  }

  return <>{children}</>
}
