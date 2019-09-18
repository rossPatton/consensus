import Koa from 'koa';
import uuidv4 from 'uuid/v4';

// generate nonce for use with content security policy
export const nonceMiddleware = async (app: Koa) => {
  app.use(async (ctx, next) => {
    if (ctx.state.locals) {
      ctx.state.locals.nonce = uuidv4();
    } else {
      ctx.state.locals = { nonce: uuidv4() };
    }

    await next();
  });
};

