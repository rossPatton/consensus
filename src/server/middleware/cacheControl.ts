import Koa from 'koa';
import cacheControl from 'koa-ctx-cache-control';

export const cacheControlMiddleware = async (app: Koa) => {
  // adds Cache-Control header
  await cacheControl(app);

  // set Cache-Control time, dont cache during development
  app.use(async (ctx, next) => {
    const timeToCache = __PROD__ ? '6 months' : false;
    ctx.cacheControl(timeToCache);
    await next();
  });
};
