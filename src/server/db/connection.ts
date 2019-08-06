import Knex from 'knex';

// requiring it this way shuts typescript up
const knexConfig = require('../../../knexfile')[__NODE_ENV__];
export const knex = Knex(knexConfig);
