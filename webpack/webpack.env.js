// dotenv just defines common sense defaults for us + can be used to store
// sensitive variables, like DB password or auth tokens, etc
require('dotenv').config();

// normalize any env vars used during build time here
const CWD = process.cwd();

const {
  DEBUG,
  DB_POOL_MIN,
  DB_POOL_MAX,
  NODE_ENV,
  SERVICE_URL,
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
  DB_POOL_MIN,
  DB_POOL_MAX,
  DEBUG: DEBUG === 'true',
  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
  NODE_ENV,
  SERVICE_URL,
  stats,
};
