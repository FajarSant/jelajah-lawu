"use client"
import { useSession } from "next-auth/react"

export function useAuthClient() {
  const { data, status } = useSession()
  return {
    user: data?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  }
}
