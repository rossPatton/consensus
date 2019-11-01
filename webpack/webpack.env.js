// normalize any env vars used during build time here
// basically converting strings like 'true' or 'false' into booleans
// and by defining as webpack globals, they are available client side as well
require('dotenv-safe').config();

const CWD = process.cwd();
const { DB, DEBUG, NODE_ENV } = process.env;

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
  DEBUG: DEBUG === 'true',
  DEV: NODE_ENV === 'development',
  PROD: NODE_ENV === 'production',
  NODE_ENV,
  stats,
};
