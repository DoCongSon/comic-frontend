'use client'

import LogoutButton from '@/components/logout-button'
import { useAppContext } from '../app-provider'

const MePage = () => {
  const { user } = useAppContext()
  console.log('🚀 ~ user:', user)

  return (
    <div>
      <LogoutButton />
      <h1>me page</h1>
    </div>
  )
}

export default MePage
