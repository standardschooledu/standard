'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showUI, setShowUI] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (session && pathname === '/login') {
        router.replace('/admin')
      } else if (!session && pathname !== '/login') {
        router.replace('/login')
      } else {
        // user is either allowed to be here or redirect is handled
        setShowUI(true)
      }
    }
  }, [session, loading, pathname, router])

  if (loading || !showUI) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return <>{children}</>
}