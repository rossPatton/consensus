const path = require('path');
const fs = require('fs');
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForceCaseSensitivityPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');

const env = require('./webpack.env');

const srcPath = (subdir) => path.join(env.CWD, 'src', subdir);

process.traceDeprecation = env.DEV;

module.exports = {
  devtool: env.DEV ? 'inline-source-map' : undefined,

  // do it this way so that debug mode works
  mode: env.DEV ? 'development' : 'production',
  stats: env.DEV ? env.stats : 'errors-only',

  resolve: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom',
      '~app': srcPath(''),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
    modules: ['./node_modules', './src'],
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: ['babel-loader'],
        test: /\.(js|ts|tsx)$/,
      },
      {
        use: ['file-loader'],
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
      },
      {
        exclude: /node_modules/,
        test: /\.mmdb$/,
        use: ['ignore-loader'],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  removeTitle: true,
                },
                {
                  convertColors: {
                    shorthex: false,
                  },
                },
                {
                  convertPathData: false,
                },
              ],
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimize: !!env.PROD,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    // does what the name implies
    new webpack.optimize.AggressiveMergingPlugin(),

    // keeps hashes consistent between compilations
    // new webpack.optimize.OccurrenceOrderPlugin(),

    // protects us from case mismatch import errors
    new ForceCaseSensitivityPlugin(),

    // server only globals should go in webpack.server
    new webpack.DefinePlugin({
      __DB__: JSON.stringify(env.DB),
      __DEBUG__: !!env.DEBUG,
      __DEV__: !!env.DEV,
      __PROD__: !!env.PROD,
      __HCAPTCHA_KEY__: JSON.stringify(env.HCAPTCHA_KEY),
      __HCAPTCHA_SECRET__: JSON.stringify(env.HCAPTCHA_SECRET),
      __MAIL_DOMAIN__: JSON.stringify(env.MAIL_DOMAIN),
      __MAIL_KEY__: JSON.stringify(env.MAIL_KEY),
      __MAIL_SANDBOX__: JSON.stringify(env.MAIL_SANDBOX),
      __MAIL_URL__: JSON.stringify(env.MAIL_URL),
      __NOINDEX__: JSON.stringify(env.NO_INDEX),
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __SPACES_KEY__: JSON.stringify(env.SPACES_KEY),
      __SPACES_SECRET__: JSON.stringify(env.SPACES_SECRET),
      __URL__: JSON.stringify(!!env.DEV
        ? 'https://consensus.local'
        : 'https://consens.us.org'),
    }),

    // force webpack environment to be whatever we set NODE_ENV to, just to be safe
    new webpack.EnvironmentPlugin('NODE_ENV'),

    // opt-in lodash list. anything not here, does not get added to the bundle
    new LodashModuleReplacementPlugin({
      collections: true,
      flattening: true,
      paths: true,
    }),
  ],
};
