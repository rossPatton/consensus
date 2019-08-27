import Knex from 'knex';

// requiring it this way shuts eslint/typescript up
const knexConfig = require('../../../knexfile.ts')[__NODE_ENV__];
export const knex = Knex(knexConfig);
