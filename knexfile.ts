require('dotenv-safe').config();
require('ts-node/register');
const fs = require('fs');
const path = require('path');

// const pg = require('pg');
// pg.defaults.ssl = true;

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
    min: 1,
    max: 47,
  },
  seeds: {
    directory: seeds,
  },
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    port: DB_PORT, //parseInt(DB_PORT, 10),
    database: DB,
    // comment out if using local database
    ssl: {
      ca : fs.readFileSync(path.join(CWD, 'certs', 'postgres.crt')),
      rejectUnauthorized: true,
    }
  },
};

module.exports = {
  development: {
    ...sharedConfig,
  },
  production: {
    ...sharedConfig,
  },
};
