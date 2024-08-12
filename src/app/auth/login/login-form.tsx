'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
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
import { useRouter, useSearchParams } from 'next/navigation'
import envConfig from '@/config'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox, type CheckedState } from '@/components/ui/checkbox'
import { isClient } from '@/lib/http'

const LoginForm = () => {
  const [googleLoading, setGoogleLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectFrom = searchParams.get('redirectFrom')

  useEffect(() => {
    ;(async () => {
      if (redirectFrom === 'google') {
        const refreshToken = Cookies.get('auth')
        if (refreshToken) {
          setGoogleLoading(true)
          const response = await authApiRequest.refreshToken(refreshToken)
          localStorage.setItem('sessionTokens', JSON.stringify(response.payload))
          await authApiRequest.auth(response.payload)
          const me = await userApiRequest.me()
          setUser(me.payload)
          router.push('/me')
          router.refresh()
          Cookies.remove('auth')
          toast.success('Login with Google successfully')
          setGoogleLoading(false)
        }
      }
    })()
  }, [redirectFrom, router, setUser])

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: isClient() ? localStorage.getItem('email') || '' : '',
      password: isClient() ? localStorage.getItem('password') || '' : '',
      remember: isClient() ? !!localStorage.getItem('email') : false,
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async ({ email, password, remember }: LoginBodyType) => {
    if (loading) return
    if (remember) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
    try {
      setLoading(true)
      const result = await authApiRequest.login({ email, password })
      await authApiRequest.auth(result.payload)
      const me = await userApiRequest.me()
      setUser(me.payload)
      router.push('/me')
      router.refresh()
      toast.success('Login successfully')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLoginWithGoogle = async () => {
    window.open(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/google?return=${envConfig.NEXT_PUBLIC_URL}/auth/login?redirectFrom=google`,
      '_self'
    )
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
                <PasswordInput autoComplete='current-password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem className='!mt-3 flex items-center'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange as (checked: CheckedState) => void} />
              </FormControl>
              <FormLabel className='leading-none ml-3'>Remember me</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={loading || googleLoading}>
          {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Login
        </Button>
        <Button
          variant='outline'
          className='w-full'
          onClick={handleLoginWithGoogle}
          type='button'
          disabled={loading || googleLoading}>
          {googleLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
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
