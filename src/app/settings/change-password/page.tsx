'use client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { handleErrorApi } from '@/lib/utils'
import { PasswordInput } from '@/components/ui/password-input'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAppContext } from '@/app/app-provider'
import { ChangePasswordBody, ChangePasswordBodyType } from '@/schemaValidations/user.schema'
import authApiRequest from '@/apiRequests/auth'
import { toast } from 'sonner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Change password',
}

const ChangePasswordPage = () => {
  const { user } = useAppContext()
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: ChangePasswordBodyType) => {
    console.log('🚀 ~ values:', values)
    if (loading) return
    try {
      setLoading(true)
      await authApiRequest.ChangePassword(values)
      toast.success('Password changed successfully')
      form.reset()
    } catch (error) {
      console.log('🚀 ~ error:', error)

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
        <Card x-chunk='dashboard-04-chunk-1'>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>You should change your password regularly to protect your account.</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='border-t px-6 py-4'>
            <Button type='submit' disabled={loading}>
              {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ChangePasswordPage
