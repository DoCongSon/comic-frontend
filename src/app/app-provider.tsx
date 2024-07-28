'use client'
import { isClient } from '@/lib/http'
import { UserResType } from '@/schemaValidations/user.schema'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AppContext = createContext<{
  user: UserResType | null
  setUser: (user: UserResType | null) => void
  isAuthenticated: boolean
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserResType | null>(() => {
    // if (isClient()) {
    //   const _user = localStorage.getItem('user')
    //   return _user ? JSON.parse(_user) : null
    // }
    return null
  })
  const isAuthenticated = Boolean(user)
  const setUser = useCallback(
    (user: UserResType | null) => {
      setUserState(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    [setUserState]
  )

  useEffect(() => {
    const _user = localStorage.getItem('user')
    setUserState(_user ? JSON.parse(_user) : null)
  }, [setUserState])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
      }}>
      {children}
    </AppContext.Provider>
  )
}
