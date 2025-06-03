/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/fitlog' : '',
  //basePath: process.env.NODE_ENV === 'production' ? '/fitlog' : '',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.line-apps.com"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig