import Koa from 'koa';
import { bodyParserMiddleware } from './bodyParser';
import { cacheControlMiddleware } from './cacheControl';
import { compressionMiddleware } from './compression';
import { corsMiddleware } from './cors';
import { errorHandlerMiddleware } from './errorHandler';
import { helmetMiddleware } from './helmet';
import { loggerMiddleware } from './logger';
import { redirectTrailingSlashMiddleware } from './redirectTrailingSlash';
import { responseTimeHeaderMiddleware } from './responseTimeHeader';
import { sslMiddleware } from './ssl';
import { staticFileMiddleware } from './static';

// middleware order is important
export const setupMiddleware = (app: Koa) => {
  corsMiddleware(app);
  bodyParserMiddleware(app);
  compressionMiddleware(app);
  sslMiddleware(app);

  // any error handlers go here
  errorHandlerMiddleware(app);

  // then set headers
  cacheControlMiddleware(app);
  responseTimeHeaderMiddleware(app);

  // then the misc stuff
  loggerMiddleware(app);
  redirectTrailingSlashMiddleware(app);
  staticFileMiddleware(app);
  helmetMiddleware(app);
};
