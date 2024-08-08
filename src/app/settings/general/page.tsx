'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleErrorApi } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAppContext } from '@/app/app-provider'
import { UpdateProfileBody, UpdateProfileBodyType } from '@/schemaValidations/user.schema'
import userApiRequest from '@/apiRequests/user'
import { toast } from 'sonner'
import { Metadata } from 'next'

const GeneralPage = () => {
  const { user, setUser } = useAppContext()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(UpdateProfileBody),
    defaultValues: {
      name: '',
      email: '',
      avatar: '',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    }
  }, [form, user])

  const handleResetForm = () => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    }
  }

  // 2. Define a submit handler.
  const onSubmit = async (values: UpdateProfileBodyType) => {
    if (loading) return
    try {
      setLoading(true)
      const response = await userApiRequest.updateProfile(values)
      setUser(response.payload)
      toast.success('Update profile successfully')
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
        <Card>
          <CardHeader>
            <CardTitle>Account information</CardTitle>
            <CardDescription>Used to identify you and display all information your at website</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-6'>
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
              name='avatar'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder='https://avatar.png' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='border-t px-6 py-4 flex gap-6'>
            <Button type='submit' disabled={loading}>
              {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
            <Button type='button' variant='outline' onClick={handleResetForm}>
              Reset
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default GeneralPage
