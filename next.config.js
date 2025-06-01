/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/fitlog' : '',
  //basePath: process.env.NODE_ENV === 'production' ? '/fitlog' : '',
}

module.exports = nextConfig