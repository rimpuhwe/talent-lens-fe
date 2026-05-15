const nextConfig = {
  output: 'standalone',
  typedRoutes: false,
  allowedDevOrigins: ['http://localhost:3000', '192.168.1.208'],
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;