import Koa from 'koa';
import koaHelmet from 'koa-helmet';

// diable browser features we don't use to prevent their abuse
export const hstsMiddleware = async (app: Koa) =>
  app.use(koaHelmet.hsts({
    // must be at least 1 year to be approved by google hsts preload
    maxAge: 31536000,
    // must be enabled to be approved
    includeSubDomains: true,
    preload: true
}));


