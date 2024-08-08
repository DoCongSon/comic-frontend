import Image from 'next/image'

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2'>
      <div className='flex items-center justify-center py-12'>{children}</div>
      <div className='hidden lg:block select-none'>
        <Image
          src='/auth-background.png'
          alt='Image'
          width='900'
          height='1200'
          quality={100}
          priority
          className='w-full object-contain h-[calc(100vh-4rem)]'
        />
      </div>
    </div>
  )
}

export default AuthLayout
