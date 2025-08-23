'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { session, loading } = useAuth()

  useEffect(() => {
    if (!loading && !session && pathname !== '/login') {
      router.replace('/login')
    }
  }, [session, loading, pathname, router])

  // Don't render children until loading is false and user is authenticated
  if (loading || (!session && pathname !== '/login')) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return <>{children}</>
}
