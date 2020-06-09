import Koa from 'koa';
import serve from 'koa-static';
export const staticFileMiddleware = async(app: Koa) => {
  app.use(serve('dist', {
    brotli: true,
    gzip: true,
    maxAge: 15552000,
  }));
};
