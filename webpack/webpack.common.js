const path = require('path');
const fs = require('fs');
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForceCaseSensitivityPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const env = require('./webpack.env');

const srcPath = (subdir) => path.join(env.CWD, 'src', subdir);
const devPlugins = env.DEV ? [new FriendlyErrorsWebpackPlugin()] : [];

module.exports = {
  devtool: env.DEV ? 'inline-source-map' : undefined,

  // do it this way so that debug mode works
  mode: env.DEV ? 'development' : 'production',
  stats: env.DEV ? env.stats : 'errors-only',

  resolve: {
    // alias: {
    //   // 'react-dom': '@hot-loader/react-dom',
    //   '@components': srcPath('components'),
    //   '@containers': srcPath('containers'),
    // },
    modules: ['./node_modules', './src'],
    extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.styl'],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
        loaders: ['file-loader'],
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
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'stylus-loader',
            options: {
              preferPathResolver: 'webpack',
              use: [
                require('nib')(),
                require('poststylus')([
                  require('autoprefixer')(),
                  require('css-mqpacker')(),
                  require('postcss-unique-selectors')(),
                  require('postcss-warn-cleaner')({
                    ignoreFiles: '**/*.styl',
                  }),
                ]),
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
    // needed for server side loadable to work
    new LoadablePlugin(),

    // does what the name implies
    new webpack.optimize.AggressiveMergingPlugin(),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),

    // fun plugins here
    // better error reporting
    ...devPlugins,

    // protects us from case mismatch import errors
    new ForceCaseSensitivityPlugin(),

    // server only globals should go in webpack.server
    new webpack.DefinePlugin({
      __DB__: JSON.stringify(env.DB),
      __DEBUG__: !!env.DEBUG,
      __DEV__: !!env.DEV,
      __PROD__: !!env.PROD,
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
    }),

    // force webpack environment to be whatever we set NODE_ENV to, just to be safe
    new webpack.EnvironmentPlugin('NODE_ENV'),
  ],
};
