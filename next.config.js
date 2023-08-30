// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\?url$/,
      use: {
        loader: 'url-loader',
        options: {
          publicPath: '/_next/static/', // The public path for the font files
          outputPath: 'static/', // The output path for the font files in the build directory
          name: '[name].[hash].[ext]',
        },
      },
    })

    return config
  },
}
