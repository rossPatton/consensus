const path = require('path');
const crypto = require('crypto');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { sha256 } = require('js-sha256');

const env = require('./webpack.env');
const common = require('./webpack.common.js');

// gen unique hash at build-time for our inline script
// have to update manually unfortunately if anything changes (should happen rarely)
// if updating gets too burdensome, switch to nonces
const hash = sha256('WebFontConfig={custom:{families:["Ivar","Lab","LabBlack","Eksell"],urls:["/static/fonts.css"]}};window.__PRELOADED_STATE__ = {"org":{"error":null,"isLoading":false,"data":{"category":"","city":"","country":"","description":"","email":"","orgName":"","slug":"","state":"","username":""}},"users":{"error":null,"isLoading":false,"data":[]},"usersByOrg":{"error":null,"isLoading":false,"data":{"userTotal":0,"users":[]}}}');

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
      __DB_POOL_MIN__: env.DB_POOL_MIN,
      __DB_POOL_MAX__: env.DB_POOL_MAX,
      __HASH__: JSON.stringify(hash),
      __SECRET__: JSON.stringify(secret),
      __SERVER__: true,
    }),
  ],
});

