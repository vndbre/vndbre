// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['userapi.com', 'sun9-32.userapi.com', 's2.vndb.org'],
  },
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search/vn',
        permanent: true,
      },
      {
        source: '/vn/:id',
        destination: '/vn/:id/overview',
        permanent: true,
      },
    ];
  },
};
export default config;
