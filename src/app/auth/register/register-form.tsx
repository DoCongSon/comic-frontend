'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { useState } from 'react'
import { handleErrorApi } from '@/lib/utils'
import authApiRequest from '@/apiRequests/auth'
import userApiRequest from '@/apiRequests/user'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { useAppContext } from '@/app/app-provider'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/ui/password-input'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: RegisterBodyType) => {
    if (loading) return
    try {
      setLoading(true)
      const result = await authApiRequest.register(values)
      await authApiRequest.auth(result.payload)
      const me = await userApiRequest.me()
      setUser(me.payload)
      router.push('/me')
      router.refresh()
      toast.success('Register successfully')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input autoComplete='name' placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput autoComplete='current-password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={loading}>
          {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Register
        </Button>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='login' className='underline'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
