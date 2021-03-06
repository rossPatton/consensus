import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

export const bodyParserMiddleware = async (app: Koa) =>
  app.use(bodyParser({
    extendTypes: {
      json: ['application/csp-report'],
    },
  }));
