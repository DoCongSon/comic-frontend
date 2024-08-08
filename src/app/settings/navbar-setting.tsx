'use client'

import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavbarSetting = () => {
  const pathname = usePathname()
  const navItems = [
    { label: 'General', href: '/settings/general' },
    { label: 'Change password', href: '/settings/change-password' },
  ]
  return (
    <nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href} className={cx(pathname === item.href ? 'font-semibold text-primary' : '')}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavbarSetting
