import Koa from 'koa';
import c2k from 'koa-connect';
import devMiddleware from 'webpack-dev-middleware';
// import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../../../webpack';

const compiler = webpack(webpackConfig);
const { publicPath } = webpackConfig[0].output;

export const devServerMiddleware = async (app: Koa) => {
  await app.use(c2k(devMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
  })));
  // must go after devMiddleware
  // app.use(c2k(hotMiddleware(compiler)));
};
