import Koa from 'koa';
import logger from 'koa-logger';

// automatic super simple server logger (request time, status, response time, etc)
export const loggerMiddleware = async (app: Koa) => app.use(logger());

