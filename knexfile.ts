require('dotenv').config();
require('ts-node/register');

const path = require('path');
const Knex = require('knex');
// const pg = require('pg');
// pg.defaults.ssl = true; // necessary stupid hack to force knex to use ssl

const CWD = process.cwd();
const migrations = path.join(CWD, 'src', 'server', 'db', 'migrations');
const seeds = path.join(CWD, 'src', 'server', 'db', 'seeds');

const DB_HOST = process.env.DB_HOST as string || '127.0.0.1';
const DB_PW = process.env.DB_PW as string || '';
const DB_DEV_PW = process.env.DB_DEV_PW as string || '';
const DB_PROD_PW = process.env.DB_PROD_PW as string || '';
const DB_TEST_PW = process.env.DB_TEST_PW as string || '';
const poolMin = parseInt(process.env.DB_POOL_MIN as string, 0) || 1;
const poolMax = parseInt(process.env.DB_POOL_MAX as string, 0) || 10;

module.exports = {
  development: {
    client: 'pg',
    debug: false,
    version: '11',
    connection: {
      host: DB_HOST,
      user: 'consensusdev',
      password: DB_DEV_PW,
      database: 'consensus_dev',
      // ssl: true,
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
      host: DB_HOST,
      user: 'consensusprod',
      password: DB_PROD_PW,
      // eventually this should be consensus_prod
      database: 'consensus_dev',
      // ssl: true,
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
      host: DB_HOST,
      user: 'consensustest',
      password: DB_TEST_PW,
      database: 'consensus_test',
      // ssl: true,
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
