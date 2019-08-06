// TODO just use dotenv for everything environment related

// normalize any env vars used during build time here
const CWD = process.cwd();

const {
  DEBUG = 'false',
  DB_POOL_MIN = 1,
  DB_POOL_MAX = 10,
  NODE_ENV = 'development',
  SERVICE_URL = 'https://127.0.0.1',
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
