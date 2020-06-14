// normalize any env vars used during build time here
// basically converting strings like 'true' or 'false' into booleans
// and by defining as webpack globals, they are available client side as well
require('dotenv-safe').config();

const CWD = process.cwd();
const {
  DB,
  DEBUG = 'false',
  HCAPTCHA_KEY,
  HCAPTCHA_SECRET,
  MAIL_DOMAIN,
  MAIL_KEY,
  MAIL_SANDBOX,
  MAIL_URL,
  NODE_ENV = 'production',
  NO_INDEX = 'false',
  SPACES_KEY,
  SPACES_SECRET,
} = process.env;

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
  DB,
  DEBUG: DEBUG === 'true',
  DEV: NODE_ENV === 'development',
  HCAPTCHA_KEY,
  HCAPTCHA_SECRET,
  NO_INDEX: NO_INDEX === 'true',
  MAIL_DOMAIN,
  MAIL_KEY,
  MAIL_SANDBOX,
  MAIL_URL,
  NODE_ENV,
  PROD: NODE_ENV === 'production',
  SPACES_KEY,
  SPACES_SECRET,
  stats,
};
