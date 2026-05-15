const mainApiUrl =
  process.env.MAIN_API_URL ??
  process.env.NEXT_PUBLIC_MAIN_API_URL ??
  'https://talent-lens-be-production.up.railway.app';

const aiApiUrl =
  process.env.AI_API_URL ??
  process.env.NEXT_PUBLIC_AI_API_URL ??
  'https://talent-ai-production-1975.up.railway.app';

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
  /** Same-origin proxy — avoids browser CORS blocks on PATCH/POST to Railway */
  async rewrites() {
    return [
      {
        source: '/api/proxy/main/:path*',
        destination: `${mainApiUrl}/:path*`,
      },
      {
        source: '/api/proxy/ai/:path*',
        destination: `${aiApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;