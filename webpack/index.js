const fs = require('fs-extra');
const loglevel = require('loglevel');

loglevel.setDefaultLevel('info');

const {DEBUG, NODE_ENV} = require('./webpack.env');
const CLIENT = require('./webpack.client');
const SERVER = require('./webpack.server');

let startupMsg = `\n🚧  ${NODE_ENV} 🚧\n`;
if (DEBUG) {
  startupMsg = '\n🚨  DEBUG TIME 🚨\n';
} else if (NODE_ENV === 'production') {
  startupMsg = `\n✅  ${NODE_ENV} ✅\n`;
}

loglevel.info(startupMsg);
module.exports = [CLIENT, SERVER];
