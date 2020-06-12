import Koa from 'koa';
import cacheControl from 'koa-cache-control';

export const cacheControlMiddleware = async (app: Koa) => {
  // 30 days vs 5 seconds
  const timeToCache = __PROD__ ? 31536000000 : 0;
  app.use(cacheControl({
    maxAge: timeToCache,
    staleWhileRevalidate: 86400,
  }));
};
