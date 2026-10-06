import type { NextConfig } from 'next';
const config: NextConfig = {
  async rewrites() { return [{ source: '/api/:path*', destination: `${process.env.API_URL || 'http://127.0.0.1:3001'}/api/:path*` }]; },
  async headers() { return [{ source: '/:path*', headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }, { key: 'X-Content-Type-Options', value: 'nosniff' }] }]; },
};
export default config;
