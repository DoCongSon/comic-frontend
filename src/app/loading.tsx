import React from 'react'

const loading = () => {
  return (
    <div className='flex items-center justify-center w-screen h-[calc(100vh-4rem)]'>
      <div className='w-16 h-16 border-8 border-dashed rounded-full animate-spin border-destructive'></div>
    </div>
  )
}

export default loading
