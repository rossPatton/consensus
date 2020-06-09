const path = require('path');
const fs = require('fs');
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForceCaseSensitivityPlugin = require('case-sensitive-paths-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
const env = require('./webpack.env');

const srcPath = (subdir) => path.join(env.CWD, 'src', subdir);
const devPlugins = env.DEV ? [new FriendlyErrorsWebpackPlugin()] : [];

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
    },
    modules: ['./node_modules', './src'],
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.(js|ts|tsx)$/,
      },
      {
        loaders: ['file-loader'],
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
      },
      {
        exclude: /node_modules/,
        test: /\.mmdb$/,
        loaders: ['ignore-loader'],
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
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },

  optimization: {
    minimize: !!env.PROD,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    // needed for server side loadable to work
    new LoadablePlugin(),

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),

    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),

    // does what the name implies
    new webpack.optimize.AggressiveMergingPlugin(),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),

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

    // fun plugins here
    // better error reporting
    ...devPlugins,
  ],
};
