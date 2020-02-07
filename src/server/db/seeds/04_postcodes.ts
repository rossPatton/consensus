require('dotenv-safe').config();
import Knex from 'knex';
import _ from 'lodash';

import postcodes from '../../../json/usa/cities.json';

const createCodes = async (row: any, i: number) =>
  row.codes.map((code: number) => ({
    city: i + 1,
    code,
  }));

exports.seed = async (knex: Knex) => {
  const codesWithNulls = await Promise.all(postcodes.map(createCodes));
  const codes = codesWithNulls.filter(c => !!c);

  // split processed cities file into chunks
  // postgres can't handle inserting everything at once unfortunately
  const [chunk1, chunk2] = _.partition(_.flatten(codes), (_: any) => _.city < 12500);

  await knex('postcodes').del();
  await knex('postcodes').insert(chunk1);
  await knex('postcodes').insert(chunk2);
};
