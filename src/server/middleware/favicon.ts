import Koa from 'koa';
import favicon from 'koa-favicon';

export const faviconMiddleware = async (app: Koa) =>
  app.use(favicon('dist/static/favicon.ico'));

// export const faviconMiddleware = async (app: Koa) => {
//   await app.use((ctx, next) => {
//     return next();
//   });
// };
