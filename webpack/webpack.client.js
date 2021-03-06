const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');

const devServer = require('./webpack.devServer');
const common = require('./webpack.common.js');
const env = require('./webpack.env');

// set stricter whitelist for prod
const local = env.NODE_ENV === 'development'
  ? "'self' 127.0.0.1:* 0.0.0.0:* https://consensus.local"
  : "'self'";

const hcaptcha = 'https://*.hcaptcha.com https://hcaptcha.com';
const imgSrc = `${local} https://consensus.nyc3.digitaloceanspaces.com`;
const url = !!env.DEV
  ? 'https://consensus.local/api/v1'
  : 'https://consens.us.org/api/v1';

let prodPlugins = [];
if (env.PROD) {
  prodPlugins = [
    // new CleanWebpackPlugin({
    //   cleanAfterEveryBuildPatterns: ['!server.js'],
    //   cleanStaleWebpackAssets: true,
    //   dry: false,
    //   protectWebpackAssets: true,
    //   verbose: true,
    // }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$|\.png$|\.ico$|\.svg$|\.json$/,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$|\.png$|\.ico$|\.svg$|\.json$/,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new OfflinePlugin({
      appShell: '/app-shell.html',
    }),
  ];
}

let precacheList = [
  '/app-shell.html',
  /\.html$/,
  /\.css$/,
  /\.png$/,
  /\.ico$/,
  /\.svg$/,
  /\.json$/,
  /\.webp$/,
  /\.jpe?g$/,
  /\.json$/,
  /\.woff$/,
  /\.woff2$/,
];
if (env.PROD) {
  precacheList = [...precacheList, /\.br$/];
} else {
  precacheList = [...precacheList, /\.js$/];
}

module.exports = merge(common, {
  target: 'web',
  entry: [
    './src/client.tsx',
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ]
  },

  output: {
    chunkFilename: '[name][chunkhash].js',
    filename: 'main[chunkhash].js',
    path: path.join(env.CWD, 'dist'),
    publicPath: '/', // serve chunks from root path
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

  // new webpack.HotModuleReplacementPlugin(),
  // dashboard to keep us updated on bundle rebuilding times, etc. client only
  // new DashboardPlugin({ port: 3002 }),

  plugins: [
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    }),

    new HtmlWebpackPlugin({
      filename: 'app-shell.html',
      scriptLoading: 'defer',
      title: "Consens.us - for when you need to get organized.",
      // ideally this should be an app shell pattern not an empty page
      templateContent: ({htmlWebpackPlugin}) => {
        return `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta http-equiv="Content-Security-Policy" content="base-uri 'none'; connect-src ${local}; default-src 'self'; block-all-mixed-content; font-src ${local}; form-action ${local}; frame-src ${hcaptcha}; img-src ${imgSrc}; manifest-src ${local}; object-src 'none'; script-src ${local} ${hcaptcha}; style-src ${hcaptcha} ${local}; worker-src ${local}">
              <title>Consensus - when you need to get organized.</title>
              <link rel="icon" href="/favicon.ico">
              <link rel="icon" href="/favicon-32x32.png" type="image/png">
            </head>
            <body>
              <div id="appRoot"></div>
              <div id="portal"></div>
              <noscript>Consens.us requires Javascript to be enabled.</noscript>
            </body>
          </html>
        `;
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),

    // copy static content over to dist dir. stuff like favicons, certs, images, etc
    new CopyPlugin([{
      context: env.CWD,
      from: 'static',
      to: '',
    }]),

    // define client side only global variables
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),

    ...prodPlugins,
  ],
});
