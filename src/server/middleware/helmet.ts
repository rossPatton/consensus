import Koa from 'koa';
import koaHelmet from 'koa-helmet';

// helmet, the security middleware, not the react metadata thing
export const helmetMiddleware = async (app: Koa) => app.use(koaHelmet());
