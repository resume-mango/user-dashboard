/* eslint-disable no-undef */
const Dotenv = require('dotenv-webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true
    // allowedHosts: ['.resumemango.com']
    //!Update this to for security
    // public: "resumemango.com"
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new Dotenv({
      path: './.env.development'
    })
  ]
}
