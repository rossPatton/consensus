import Koa from 'koa';
import noTrailingSlash from 'koa-no-trailing-slash';

export const redirectTrailingSlashMiddleware = async (app: Koa) =>
  app.use(noTrailingSlash());
