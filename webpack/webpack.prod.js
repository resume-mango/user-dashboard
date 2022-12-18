/* eslint-disable no-undef */
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  stats: {
    assets: true,
    chunks: true,
    modules: true,
  },
  optimization: {
    usedExports: true,
  },

  plugins: [
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.info(
        `\u001b[A\u001b[K\u001b[33m${(percentage * 100).toFixed(2)}%` +
          `\t\u001b[0m\u001b[1m${message}\t` +
          `\u001b[0m\u001b[90m${
            args && args.length > 0 ? args[0] : ''
          }\u001b[0m`
      )
    }),

    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env.production',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.STATS || 'disabled' }),
  ],
}
