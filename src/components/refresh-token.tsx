'use client'

import authApiRequest from '@/apiRequests/auth'
import { useEffect } from 'react'
import { TokensType } from '@/schemaValidations/auth.schema'

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date()
      const sessionTokens: TokensType = JSON.parse(localStorage.getItem('sessionTokens') || 'null')
      if (sessionTokens && new Date(sessionTokens.access.expires).getTime() - now.getTime() < 1000 * 60 * 10) {
        if (new Date(sessionTokens.refresh.expires).getTime() - now.getTime() < 0) {
          // logout
          await authApiRequest.auth(null)
          localStorage.removeItem('sessionTokens')
          clearInterval(interval)
          return
        }
        const response = await authApiRequest.refreshToken(sessionTokens.refresh.token)
        localStorage.setItem('sessionTokens', JSON.stringify(response.payload))
      }
    }, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [])
  return null
}
