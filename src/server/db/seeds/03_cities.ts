require('dotenv-safe').config();
import Knex from 'knex';
import _ from 'lodash';

import citiesMap from '../../../json/usa/cities.json';
import stateMap from '../../../json/usa/stateCodeMap.json';

const statesByName = Object.keys(stateMap);
const createCity = async (row: {city: string, state: string}) => {
  // arr index is 0 based, db is 1 based
  const regionId = statesByName.findIndex(state => state === row.state) + 1;

  return {
    name: row.city,
    region: row.state,
    regionId,
  };
};

exports.seed = async (knex: Knex) => {
  // split processed cities file into chunks
  // postgres can't handle inserting everything at once
  // use a value here that is a whole integer
  const [chunk1, chunk2, chunk3, chunk4] = _.chunk(
    citiesMap,
    citiesMap.length / 4,
  );

  const cities1 = await Promise.all(chunk1.map(createCity));
  const cities2 = await Promise.all(chunk2.map(createCity));
  const cities3 = await Promise.all(chunk3.map(createCity));
  const cities4 = await Promise.all(chunk4.map(createCity));

  await knex('cities').del();
  await knex('cities').insert(cities1);
  await knex('cities').insert(cities2);
  await knex('cities').insert(cities3);
  await knex('cities').insert(cities4);
};
