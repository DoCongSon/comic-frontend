import React from 'react'
import LoginForm from './login-form'

const LoginPage = () => {
  return (
    <div className='mx-auto grid w-[400px] gap-6'>
      <div className='grid gap-4 text-center'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='text-balance text-muted-foreground'>Enter your email and password below to login</p>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
