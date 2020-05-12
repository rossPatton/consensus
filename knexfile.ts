require('dotenv-safe').config();
require('ts-node/register');

const fs = require('fs');
const path = require('path');
const Knex = require('knex');
// const pg = require('pg');
// pg.defaults.ssl = true; // necessary stupid hack to force knex to use ssl

const CWD = process.cwd();
const migrations = path.join(CWD, 'src', 'server', 'db', 'migrations');
const seeds = path.join(CWD, 'src', 'server', 'db', 'seeds');

console.log(path.join(CWD, 'certs', 'postgres.crt'));

const DB = process.env.DB as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_USER = process.env.DB_USER as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_DEV_PW = process.env.DB_DEV_PW as string;
const DB_PROD_PW = process.env.DB_PROD_PW as string;

const sharedConfig = {
  client: 'pg',
  debug: false,
  version: '11',
  migrations: {
    directory: migrations,
  },
  pool: {
    min: 1,
    max: 10,
  },
  seeds: {
    directory: seeds,
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_DEV_PW,
      port: DB_PORT,
      database: DB,
      ssl: {
        ca : fs.readFileSync(path.join(CWD, 'certs', 'postgres.crt')),
        rejectUnauthorized: true,
      }
    },
  },
  production: {
    ...sharedConfig,
    connection: {
      // @TODO connect to prod DB instead of dev one
      host: DB_HOST,
      user: DB_USER,
      password: DB_DEV_PW,
      port: DB_PORT,
      database: DB,
      ssl: {
        ca : fs.readFileSync(path.join(CWD, 'certs', 'postgres.crt')),
        rejectUnauthorized: true,
      },
    },
  },
};
