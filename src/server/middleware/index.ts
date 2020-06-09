import Koa from 'koa';

import { bodyParserMiddleware } from './bodyParser';
import { cacheControlMiddleware } from './cacheControl';
import { compressionMiddleware } from './compression';
import { contentSecurityPolicyMiddleware } from './contentSecurityPolicy';
import { corsMiddleware } from './cors';
import { errorHandlerMiddleware } from './errorHandler';
import { faviconMiddleware } from './favicon';
import { featurePolicyMiddleware } from './featurePolicy';
import { helmetMiddleware } from './helmet';
import { hstsMiddleware } from './hsts';
import { loggerMiddleware } from './logger';
import { rateLimiterMiddleware } from './rateLimiter';
import { redirectTrailingSlashMiddleware } from './redirectTrailingSlash';
import { referrerPolicyMiddleware } from './referrerPolicy';
import { responseTimeHeaderMiddleware } from './responseTimeHeader';
import { sslMiddleware } from './ssl';

// to avoid blasting passport deserialize on every request (including static files)
// we pull this out and up, so it goes before passport. this resolves the issue
export { staticFileMiddleware } from './static';

// middleware order is important
export const setupMiddleware = (app: Koa) => {
  bodyParserMiddleware(app);
  compressionMiddleware(app);

  // security stuff
  if (__PROD__) {
    rateLimiterMiddleware(app);
  }

  corsMiddleware(app);
  sslMiddleware(app);
  helmetMiddleware(app);
  referrerPolicyMiddleware(app);
  featurePolicyMiddleware(app);
  contentSecurityPolicyMiddleware(app);
  hstsMiddleware(app);

  // any error handlers go here
  errorHandlerMiddleware(app);

  // then set headers
  cacheControlMiddleware(app);
  responseTimeHeaderMiddleware(app);

  // then the misc stuff
  faviconMiddleware(app);
  loggerMiddleware(app);
  redirectTrailingSlashMiddleware(app);
};
