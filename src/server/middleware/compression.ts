import Koa from 'koa';
import compress from 'koa-compress';

export const compressionMiddleware = async (app: Koa) => {
  app.use(compress());
};
