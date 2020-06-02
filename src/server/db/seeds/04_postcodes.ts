import Knex from 'knex';
import _ from 'lodash';

import postcodes from '../../../json/usa/cities.json';

const createCodes = async (row: any, i: number) =>
  row.codes.map((code: number) => ({
    city: row.city,
    cityId: i + 1,
    code,
  }));

exports.seed = async (knex: Knex) => {
  // split processed cities file into chunks
  // postgres can't handle inserting everything at once
  // use a value here that is a whole integer
  const [chunk1, chunk2, chunk3, chunk4] = _.chunk(
    postcodes,
    postcodes.length / 4,
  );

  const codes1 = await Promise.all(chunk1.map(createCodes));
  const codes2 = await Promise.all(chunk2.map(createCodes));
  const codes3 = await Promise.all(chunk3.map(createCodes));
  const codes4 = await Promise.all(chunk4.map(createCodes));

  await knex('postcodes').del();
  // TODO there really shouldn't be any dupe city/code combos here
  await knex('postcodes').insert(_.flattenDeep(codes1));
  await knex('postcodes').insert(_.flattenDeep(codes2));
  await knex('postcodes').insert(_.flattenDeep(codes3));
  await knex('postcodes').insert(_.flattenDeep(codes4));
};
