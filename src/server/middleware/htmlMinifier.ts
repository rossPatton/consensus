import Koa from 'koa';
import minify from 'koa-html-minifier';

// basically just for api responses
export const htmlMinifierMiddleware = async (app: Koa) => {
  app.use(minify({
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    removeComments: true,
  }));
};
