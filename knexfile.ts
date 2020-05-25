require('dotenv-safe').config();
require('ts-node/register');
const fs = require('fs');
const path = require('path');
const Knex = require('knex');

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
    max: 10,
  },
  seeds: {
    directory: seeds,
  },
  // setup a local only connection. or at least, have local mirror production more
  connection: {
    host: 'host.docker.internal',// DB_HOST,
    user: 'consensusdev',// DB_USER,
    password: 'paleface_metre_drafty_krakatoa_buddhism_padre_snark_feeler_air_slider',
    // DB_PW,
    // port:  DB_PORT,
    database: 'consensus_dev',// DB,
    // ssl: {
    //   ca : fs.readFileSync(path.join(CWD, 'certs', 'postgres.crt')),
    //   rejectUnauthorized: true,
    // }
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
