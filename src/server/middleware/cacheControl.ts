import Koa from 'koa';

export const cacheControlMiddleware = async (app: Koa) => {

  // set Cache-Control time, dont cache during development
  app.use(async (ctx, next) => {
    const timeToCache = __PROD__ ? 15552000 : false;
    ctx.cacheControl(timeToCache);
    await next();
  });
};
