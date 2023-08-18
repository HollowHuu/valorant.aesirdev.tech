/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'cdn.discord.com', 'media.valorant-api.com'],
  },
}

module.exports = nextConfig
