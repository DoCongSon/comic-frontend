'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, Search, BookOpenText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAppContext } from '@/app/app-provider'
import { ModeToggle } from './mode-toggle'
import { usePathname, useRouter } from 'next/navigation'
import authApiRequest from '@/apiRequests/auth'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

const Header = () => {
  const { user, setUser } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
    } catch (error) {
      authApiRequest.logoutFromNextClientToNextServer(true)
    } finally {
      setUser(null)
      router.refresh()
      localStorage.removeItem('sessionTokens')
      toast.success('You have been logged out')
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    router.push(`/search?q=${search}`)
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Ranks', href: '/ranks' },
  ]

  return (
    <header className='sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
          <BookOpenText className='h-6 w-6' />
          <span className='sr-only'>Comics website</span>
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground',
              item.href === pathname ? 'text-foreground' : 'text-muted-foreground'
            )}>
            {item.label}
          </Link>
        ))}
        <Link
          href={pathname.includes('/genres') ? '#' : '/genres/action'}
          className={cn(
            'transition-colors hover:text-foreground',
            pathname.includes('/genres') ? 'text-foreground' : 'text-muted-foreground'
          )}>
          Genres
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
              <BookOpenText className='h-6 w-6' />
              <span className='sr-only'>Comics website</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground',
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                )}>
                {item.label}
              </Link>
            ))}
            <Link
              href={pathname.includes('/genres') ? '#' : '/genres/action'}
              className={cn(
                'transition-colors hover:text-foreground',
                pathname.includes('/genres') ? 'text-foreground' : 'text-muted-foreground'
              )}>
              Genres
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial' onSubmit={handleSearch}>
          <div className='relative'>
            <button type='submit' className='absolute left-2.5 top-2.5'>
              <Search className='h-4 w-4 text-muted-foreground cursor-pointer' />
            </button>
            <Input
              type='search'
              name='search'
              placeholder='Search comics...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </form>
        <ModeToggle />
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href='/me'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href='/settings/general'>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!user && (
          <Link href='/auth/login' className='text-foreground transition-colors hover:text-foreground'>
            Login
          </Link>
        )}
        {!user && (
          <Link href='/auth/register' className='text-foreground transition-colors hover:text-foreground'>
            Register
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
