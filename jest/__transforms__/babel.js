const { babelLoaderOptions } = require('../../webpack/constants');

// use client env options here
// babelLoaderOptions.presets.push(envOpts);

const jsTransform = require('babel-jest').createTransformer(babelLoaderOptions);

module.exports = jsTransform;
