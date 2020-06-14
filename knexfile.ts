require('dotenv-safe').config();
require('ts-node/register');
const fs = require('fs');
const path = require('path');
const pg = require('pg');

const CWD = process.cwd();
const migrations = path.join(CWD, 'src', 'server', 'db', 'migrations');
const seeds = path.join(CWD, 'src', 'server', 'db', 'seeds');

// values below are determined by docker config
const DB = process.env.DB as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_USER = process.env.DB_USER as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_PW = process.env.DB_PW as string;

const sharedConfig = {
  client: 'pg',
  debug: false,
  version: '11',
  migrations: {
    directory: migrations,
  },
  pool: {
    min: 0,
    max: 47,
  },
  seeds: {
    directory: seeds,
  },
  connection: {
    connectTimeout: 10000,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    port: DB_PORT,
    database: DB,
  },
};

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
  // @ts-ignore
  sharedConfig.connection.ssl = {
    ca : fs.readFileSync(path.join(CWD, 'certs', 'postgres.crt')),
    rejectUnauthorized: true,
  };
}

module.exports = {
  development: {
    ...sharedConfig,
  },
  production: {
    ...sharedConfig,
  },
};
