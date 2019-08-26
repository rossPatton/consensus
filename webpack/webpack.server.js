const path = require('path');
const crypto = require('crypto');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const env = require('./webpack.env');
const common = require('./webpack.common.js');

// generate secret session keys at build time, server only
const secret = crypto.randomBytes(48).toString('hex');

module.exports = merge(common, {
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(env.CWD, 'dist'),
  },
  entry: {
    server: './src/server/index.ts',
  },
  plugins: [
    // server only global variables
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DB_POOL_MIN__: env.DB_POOL_MIN,
      __DB_POOL_MAX__: env.DB_POOL_MAX,
      __SECRET__: JSON.stringify(secret),
      __SERVER__: true,
    }),
  ],
});

