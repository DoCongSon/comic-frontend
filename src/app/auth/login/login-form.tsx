'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import authApiRequest from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { toast } from 'sonner'
import userApiRequest from '@/apiRequests/user'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAppContext } from '@/app/app-provider'
import { useRouter } from 'next/navigation'
import envConfig from '@/config'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: LoginBodyType) => {
    if (loading) return
    try {
      setLoading(true)
      const result = await authApiRequest.login(values)
      await authApiRequest.auth(result.payload)
      const me = await userApiRequest.me(result.payload.access.token)
      setUser(me.payload)
      router.push('/me')
      router.refresh()
      toast.success('Login successfully')
    } catch (error) {
      console.log('🚀 ~ error:', error)

      handleErrorApi({
        error,
        setError: form.setError,
      })
    } finally {
      setLoading(false)
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handleLoginWithGoogle = async () => {
    window.open(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/google?return=http://localhost:3000/auth/login`, '_self')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete='email' placeholder='user@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Password</FormLabel>
                <Link href='forgot-password' className='ml-auto inline-block text-sm underline'>
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input autoComplete='current-password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={loading}>
          {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Login
        </Button>
        <Button variant='outline' className='w-full' onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='register' className='underline'>
            Register
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
