// 'use client'
// import { useAuth } from '@/contexts/AuthContext'
// import { useRouter, usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { getUserRole } from '@/lib/getUserRole' // <-- your function
// import { supabase } from '@/lib/supaBaseClient'

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { session, loading } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [showUI, setShowUI] = useState(false)

//   useEffect(() => {
//     const handleAuth = async () => {
//       if (loading) return

//       if (session) {
//         // ✅ Get cached role if it exists
//         let role = session.user?.user_metadata?.role as string | undefined

//         // 🔍 If no cached role, query DB
//         if (!role) {
//           const email = session.user.email
//           const roles = await getUserRole(email!)

//           // roles might be array of strings OR array of objects
//           if (roles && roles.length > 0) {
//             role = roles[0]
//             await supabase.auth.updateUser({ data: { role } })
//           }
//         }

//         // 🚦 Redirect based on role
//         if (pathname === '/login') {
//           router.replace(role ? `/${role}` : '/choose-role')
//         } else {
//           setShowUI(true)
//         }
//       } else {
//         // Not signed in
//         if (pathname !== '/login') {
//           router.replace('/login')
//         } else {
//           setShowUI(true)
//         }
//       }
//     }

//     handleAuth()
//   }, [session, loading, pathname, router, supabase])

//   if (loading || !showUI) {
//     return <div className="p-4 text-center">Loading...</div>
//   }

//   return <>{children}</>
// }

'use client'

import { useAuth } from '@/contexts/AuthContext'
import { getUserRole } from '@/lib/getUserRole'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showUI, setShowUI] = useState(false)

  useEffect(() => {
    const handleRedirect = async () => {
      if (loading) return

      if (session) {
        const email = session.user?.email
        let role: string | null = null

        if (email) {
          let roles = await getUserRole(email)
          role = roles[0]
        }

        if (pathname === '/login') {
          router.replace(role ? `/${role}` : '/admin')
        } else {
          setShowUI(true)
        }
      } else {
        if (pathname !== '/login') {
          router.replace('/login')
        } else {
          setShowUI(true)
        }
      }
    }

    handleRedirect()
  }, [session])

  if (loading || !showUI) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return <>{children}</>
}
