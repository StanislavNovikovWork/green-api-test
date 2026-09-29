import { useState, useEffect, useCallback } from 'react'
import type { AuthData } from '../types'

const STORAGE_KEY = 'authData'

export function useAuth() {
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setAuthData(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to parse auth data from localStorage', error)
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback((data: AuthData) => {
    setAuthData(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [])

  const logout = useCallback(() => {
    setAuthData(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { authData, isLoading, login, logout }
}
