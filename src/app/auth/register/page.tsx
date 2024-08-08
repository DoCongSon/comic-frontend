import React from 'react'
import RegisterForm from './register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterPage = () => {
  return (
    <div className='mx-auto grid w-[400px] gap-6'>
      <div className='grid gap-4 text-center'>
        <h1 className='text-3xl font-bold'>Register</h1>
        <p className='text-balance text-muted-foreground'>Enter your information below to create an account</p>
      </div>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
