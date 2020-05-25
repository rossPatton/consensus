import Koa from 'koa';
import favicon from 'koa-favicon';

export const faviconMiddleware = async (app: Koa) =>
  app.use(favicon('dist/favicon.ico'));
