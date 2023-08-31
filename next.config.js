/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/i,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = nextConfig
