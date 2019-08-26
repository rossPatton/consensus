const fs = require('fs-extra');
const loglevel = require('loglevel');

loglevel.setDefaultLevel('info');

const env = require('./webpack.env');
const CLIENT = require('./webpack.client');
const SERVER = require('./webpack.server');

let startupMsg = `\n🚧  ${env.NODE_ENV} 🚧\n`;
if (env.DEBUG) {
  startupMsg = '\n🚨  DEBUG TIME 🚨\n';
} else if (env.NODE_ENV === 'production') {
  startupMsg = `\n✅  ${env.NODE_ENV} ✅\n`;
}

loglevel.info(startupMsg);

module.exports = [CLIENT, SERVER];
