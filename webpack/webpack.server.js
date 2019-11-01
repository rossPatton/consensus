const path = require('path');
const crypto = require('crypto');
const merge = require('webpack-merge');
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
      __SECRET__: JSON.stringify(secret),
      __SERVER__: true,
    }),
  ],
});

