import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        cssChunking: 'strict'
    }
};

export default nextConfig;
