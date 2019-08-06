import Koa from 'koa';
import compress from 'koa-compress';

// TODO add support for brotli
export const compressionMiddleware = async (app: Koa) => app.use(compress());
