/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    serverSourceMaps: false,
    fetchCache: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jsontrans.fun',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // cacheHandler: require.resolve('./cache-handler.js'),
  // cacheMaxMemorySize: 0, // disable default in-memory caching
  productionBrowserSourceMaps: false,
  webpack: (
    config,
    { dev }
  ) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      })
    }
    // Important: return the modified config
    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/translate/:path*',
  //       destination: 'http://localhost:3000/translate/:path*', // Proxy to your backend
  //     },
  //   ]
  // },
}

module.exports = nextConfig
