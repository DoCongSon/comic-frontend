import envConfig from '@/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/auth', '/me', '/settings/**'],
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}
