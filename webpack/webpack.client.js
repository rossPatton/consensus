const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');

const devServer = require('./webpack.devServer');
const common = require('./webpack.common.js');
const env = require('./webpack.env');

module.exports = merge(common, {
  target: 'web',
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:8080',
    // 'webpack/hot/dev-server',
    './src/client.tsx',
  ],

  output: {
    filename: 'main.js',
    path: path.join(env.CWD, 'dist'),
    crossOriginLoading: env.DEV ? 'anonymous' : false,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    // new webpack.HotModuleReplacementPlugin(),

    // dashboard to keep us updated on bundle rebuilding times, etc. client only
    // new DashboardPlugin({ port: 3002 }),
    // better client side error message
    new ErrorOverlayPlugin(),

    // copy static content over to dist dir. stuff like favicons, certs, images, etc
    new CopyPlugin([{
      context: env.CWD,
      from: 'static',
      to: 'static',
    }]),

    // define client side only global variables
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),

    // gen client stats json, in case we want or need that at some point
    function(compiler) {
      this.plugin('done', function(stats) {
        fs.writeFileSync(
          path.resolve(env.CWD, 'dist', 'stats.generated.json'),
          JSON.stringify(stats.toJson()));
      });
    },
  ],
});
