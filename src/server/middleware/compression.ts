import Koa from 'koa';
import compress from 'koa-compress';

// basically just for api responses
export const compressionMiddleware = async (app: Koa) => {
  app.use(compress());
};
