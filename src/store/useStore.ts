import { create } from "zustand"

type User = {
  email: string
  role: string
} | null

type AuthState = {
  user: User
  setUser: (user: User) => void
  signOut: () => void   // ✅ add signOut here
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }), // ✅ implementation
}))
