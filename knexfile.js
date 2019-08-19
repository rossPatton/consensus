require('dotenv').config();
const path = require('path');
const Knex = require('knex');

const CWD = process.cwd();
const IS_DEV = process.env.NODE_ENV !== 'production';
const migrations = path.join(CWD, 'src', 'server', 'db', 'migrations');
const seeds = path.join(CWD, 'src', 'server', 'db', 'seeds');

const poolMin = parseInt(process.env.DB_POOL_MIN, 0) || 1;
const poolMax = parseInt(process.env.DB_POOL_MAX, 0) || 10;

module.exports = {
  development: {
    client: 'pg',
    debug: false,
    version: '11',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'consensus_dev',
    },
    migrations: {
      directory: migrations,
    },
    pool: {
      min: poolMin,
      max: poolMax,
    },
    seeds: {
      directory: seeds,
    },
  },
  production: {
    client: 'pg',
    debug: false,
    version: '11',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'consensus_prod',
    },
    migrations: {
      directory: migrations,
    },
    pool: {
      min: poolMin,
      max: poolMax,
    },
    seeds: {
      directory: seeds,
    },
  },
  // test should basically be a local copy of prod
  debug: {
    client: 'pg',
    debug: true,
    version: '11',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'consensus_dev',
    },
    migrations: {
      directory: migrations,
    },
    pool: {
      min: poolMin,
      max: poolMax,
    },
    seeds: {
      directory: seeds,
    },
  },
};
