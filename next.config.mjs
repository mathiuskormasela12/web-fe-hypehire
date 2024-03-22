/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9001'
      },
      {
        protocol: 'https',
        hostname: '6666-180-244-161-151.ngrok-free.app'
      }
    ]
  }
};

export default nextConfig;
