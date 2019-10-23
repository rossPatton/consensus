// dotenv just defines common sense defaults for us + can be used to store
// sensitive variables, like DB password or auth tokens, etc
require('dotenv').config();

// normalize any env vars used during build time here
const CWD = process.cwd();

const {
  DB,
  DEBUG,
  DB_POOL_MIN,
  DB_POOL_MAX,
  NODE_ENV,
} = process.env;

// TODO eventually move to an opts file
const stats = {
  all: false,
  modules: false,
  maxModules: 0,
  errors: true,
  warnings: true,

  // our additional debug mode options
  errorDetails: DEBUG === 'true',
  moduleTrace: DEBUG === 'true',
};

module.exports = {
  CWD,
  // development or production, decouple from NODE_ENV so we can run any env against any db
  // also will be useful if we setup a test or staging env
  DB,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DEBUG: DEBUG === 'true',
  DEV: NODE_ENV === 'development',
  PROD: NODE_ENV === 'production',
  NODE_ENV,
  stats,
};
