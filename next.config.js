/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'cdn.discord.com'],
  },
}

module.exports = nextConfig
