/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.otruyenapi.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sv1.otruyencdn.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
