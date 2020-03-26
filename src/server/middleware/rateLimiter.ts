import Koa from 'koa';
import ratelimit from 'koa-ratelimit';
// import redisStore from 'koa-redis';
import _ from 'lodash';

const db = new Map();

// really basic rate-limiter
// @TODO make more robust, use redis, yada yada
export const rateLimiterMiddleware = async (app: Koa) => {
  app.use(ratelimit({
    driver: 'memory',
    db,
    duration: 60000,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total',
    },
    max: 100,
    disableHeader: false,
  }));
};
