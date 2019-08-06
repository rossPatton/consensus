const fs = require('fs');
const path = require('path');

const env = require('./webpack.env');

module.exports = {
  clientLogLevel: 'warn',
  compress: true,
  contentBase: path.join(env.CWD, 'dist', 'static'),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  historyApiFallback: { disableDotRule: true },
  host: '0.0.0.0',
  // hot: true,
  // inline: true,
  port: '8080',
  https: true,
  overlay: true,
  watchContentBase: true,
  // serverSideRender: true,
  stats: env.stats,
};
