import Knex from 'knex';

// requiring it this way (with the arg) shuts eslint/typescript up
// use this knex object to avoid constantly re-connecting to the db
const knexConfig = require('../../../knexfile.ts')[__DB__];
export const knex = Knex(knexConfig);
