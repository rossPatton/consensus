const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {GenerateSW, InjectManifest} = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');

const devServer = require('./webpack.devServer');
const common = require('./webpack.common.js');
const env = require('./webpack.env');

let compressionPlugins = [];
if (env.NODE_ENV === 'production') {
  compressionPlugins = [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$|\.png$|\.ico$|\.svg$|\.json$/,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$|\.png$|\.ico$|\.svg$|\.json$/,
    })
  ];
}

let precacheList = [
  'app-shell.html',
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
if (env.NODE_ENV === 'production') {
  precacheList = [...precacheList, /\.br$/];
} else {
  precacheList = [...precacheList, /\.js$/];
}

module.exports = merge(common, {
  target: 'web',
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:8080',
    // 'webpack/hot/dev-server',
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

  // new CleanWebpackPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  // dashboard to keep us updated on bundle rebuilding times, etc. client only
  // new DashboardPlugin({ port: 3002 }),
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  // }),

  plugins: [
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    }),

    new HtmlWebpackPlugin({
      filename: 'app-shell.html',
      scriptLoading: 'defer',
      title: "Consens.us - for when you need to get organized.",
      templateContent: ({htmlWebpackPlugin}) => `
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="appRoot"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
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

    ...compressionPlugins,

    new GenerateSW({
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      include: precacheList,
      navigateFallback: '/app-shell',
      skipWaiting: true,
      swDest: 'sw.js',
      // swSrc: `${env.CWD}/static/sw-template.js`,
      // templatedUrls: {
      //   '/app-shell': new Date().toString(),
      // },
    }),
  ],
});
