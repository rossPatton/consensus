import reduxImmutableStateVariant from 'redux-immutable-state-invariant';
import createMemoizeMiddleware from 'redux-memoize';
import thunk from 'redux-thunk';

import { crashReporter } from './crashReporter';
import { logger } from './logger';

const requiredMiddleware = [
  thunk,
  crashReporter,
  logger,
  // ttl here is the default, can override thunk by thunk
  createMemoizeMiddleware({ttl: 100}),
];

// some middleware we only want to include in development
// in this case, immutableStateVariant will warn us of mutating state in redux
export const middleware = __DEV__ ?
  [...requiredMiddleware, reduxImmutableStateVariant()] :
  [...requiredMiddleware];
