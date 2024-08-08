import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import AppProvider from './app-provider'
import RefreshToken from '@/components/refresh-token'
import Header from '@/components/header'
import { cx } from 'class-variance-authority'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  generator: '',
  applicationName: '',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'comics',
    'manga',
    'webtoon',
    'read comics online',
    'read manga online',
    'read webtoon online',
    'truyện tranh',
    'đọc truyện tranh online',
    'đọc manga online',
    'đọc webtoon online',
    'manhua',
    'manhwa',
  ],
  authors: [{ name: 'Đỗ Công Sơn' }, { name: 'Sơn', url: 'https://docongson.netlify.app/' }],
  creator: 'Đỗ Công Sơn',
  publisher: 'Đỗ Công Sơn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    template: '%s | Super Comics',
    default: 'Super Comics',
  },
  description: 'Super Comics is the best place to read comics online. Enjoy! 🎉',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cx(inter.className)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <AppProvider>
            <Header />
            <main>{children}</main>
          </AppProvider>
          <RefreshToken />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
