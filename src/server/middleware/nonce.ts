import Koa from 'koa';
import uuidv4 from 'uuid/v4';

let prevUrl: string | undefined;

// generate nonce for use with content security policy
export const nonceMiddleware = async (app: Koa) => {
  app.use(async (ctx, next) => {
    if (!ctx.state.locals) ctx.state.locals = {};

    // only update nonce on server render - not on every single request
    if (ctx.req.url !== prevUrl) {
      ctx.state.locals.url = ctx.req.url;
      ctx.state.locals.nonce = uuidv4();
      prevUrl = ctx.req.url;
    }

    await next();
  });
};

