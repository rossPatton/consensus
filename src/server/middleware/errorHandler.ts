import Koa from 'koa';
import loglevel from 'loglevel';

// generic error-handler
export const errorHandlerMiddleware = async (app: Koa) => {
  await app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = `${err.status}: ${err.message}`;
      ctx.app.emit('error', err, ctx);
    }
  });

  // at the moment, just log to console
  // TODO render a error status page depending on error status
  return app.on('error', (err: Error) => {
    loglevel.error(err);
  });
};
