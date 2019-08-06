import Koa from 'koa';
import responseTimeMiddleware from 'koa-response-time';

export const responseTimeHeaderMiddleware = async (app: Koa) =>
  app.use(responseTimeMiddleware());
