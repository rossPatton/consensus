// Type definitions for koa-redis 3.0
// Project: https://github.com/koajs/koa-redis
// Definitions by: Nick Simmons <https://github.com/nsimmons>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

// this is here because the @types file imports from koa-generic-session
// koa-generic-session is deprecated and recommends using koa-session

import { ClientOpts } from 'redis';
import { stores } from 'koa-session';

declare module 'koa-redis' {
  export interface RedisOptions extends ClientOpts {
    // client?: any;
    duplicate?: boolean;
  }

  export function redisStore(options: RedisOptions): stores
}
