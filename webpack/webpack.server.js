const path = require('path');
const crypto = require('crypto');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WaitPlugin = require('./Wait');
const webpack = require('webpack');

const env = require('./webpack.env');
const common = require('./webpack.common.js');

const srcPath = (subdir) => path.join(env.CWD, 'src', subdir);

// generate secret session keys at build time, server only
const secret = crypto.randomBytes(48).toString('hex');
const cacheBust = crypto.randomBytes(12).toString('hex');

module.exports = merge(common, {
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(env.CWD, 'dist'),
  },
  entry: {
    server: './src/server/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ]
  },
  plugins: [
    new WaitPlugin('./dist/webpack-manifest.json'),

    // server only global variables
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __CACHE_BUST__: JSON.stringify(cacheBust),
      __SECRET__: JSON.stringify(secret),
      __SERVER__: true,
    }),
  ],
});

