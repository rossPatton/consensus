import Koa from 'koa';
import serve from 'koa-static';

// javascript, css, etc. anything "static" over a certain size
export const staticFileMiddleware = async(app: Koa) => {
  app.use(serve('dist', {
    brotli: true,
    // defer: true,
    gzip: true,
    // bafflingly, this is ms, not seconds
    maxAge: 3369600000,
  }));
};
