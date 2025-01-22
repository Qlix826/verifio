/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Désactiver temporairement HTTPS pour le développement
  // Une fois que tout fonctionne, configurez HTTPS correctement
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        'fs/promises': false,
        buffer: require.resolve('buffer/'),
      };
    }
    return config;
  },
  env: {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/verifio',
};

module.exports = nextConfig;
