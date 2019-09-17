require('dotenv').config();
import Knex from 'knex';

exports.seed = async (knex: Knex) => {
  // only country supported atm
  const createUSA = async () => ({
    code: 'us',
    name: 'United States',
    regionType: 'state',
  });

  await knex('countries').del();
  await knex('countries').insert(await createUSA());
};
