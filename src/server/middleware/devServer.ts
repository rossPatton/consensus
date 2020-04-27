import Koa from 'koa';
import c2k from 'koa-connect';
// import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../../webpack';

const compiler = webpack(webpackConfig);
const { publicPath } = webpackConfig?.[0].output;

export const devServerMiddleware = async (app: Koa) => {
  app.use(c2k(devMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
  })));
  // must go after devMiddleware
  // app.use(c2k(hotMiddleware(compiler)));
};
