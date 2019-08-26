import Koa from 'koa';
import koaHelmet from 'koa-helmet';

// limit referrer data to same-origin only
export const referrerPolicyMiddleware = async (app: Koa) =>
  app.use(koaHelmet.referrerPolicy({policy: 'same-origin'}));
