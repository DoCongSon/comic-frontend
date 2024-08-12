'use client'

import authApiRequest from '@/apiRequests/auth'
import { useAppContext } from '@/app/app-provider'
import { LoginResType } from '@/schemaValidations/auth.schema'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function LogoutLogic() {
  const router = useRouter()
  const pathname = usePathname()
  const { setUser } = useAppContext()

  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const sessionTokens: LoginResType = JSON.parse(localStorage.getItem('sessionTokens') || 'null')
    if (sessionToken === sessionTokens?.access.token) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then((res) => {
        setUser(null)
      })
    }
    router.push(`/auth/login?redirectFrom=${pathname}`)
    return () => {
      controller.abort()
    }
  }, [sessionToken, router, pathname, setUser])
  return null
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}
