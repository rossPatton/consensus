import Koa from 'koa';
import sslify from 'koa-sslify';

// redirects all http requests to https
export const sslMiddleware = async (app: Koa) => app.use(sslify({ port: 3001 }));
