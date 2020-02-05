require('dotenv-safe').config();
import Knex from 'knex';
import _ from 'lodash';

import citiesMap from '../../../json/usa/cities.json';
import stateMap from '../../../json/usa/stateCodeMap.json';

const statesByName = Object.keys(stateMap);
const createCity = async (row: {city: string, state: string}) => {
  // arr index is 0 based, db is 1 based
  const region = statesByName.findIndex(state => state === row.state) + 1;

  return {
    country: 1,
    name: row.city,
    region,
  };
};

exports.seed = async (knex: Knex) => {
  const cities = await Promise.all(citiesMap.map(createCity));

  // split processed cities file into chunks
  // postgres can't handle inserting everything at once unfortunately
  const [chunk1, chunk2] = _.partition(cities, (_: any) => _.region < 25);

  await knex('cities').del();
  await knex('cities').insert(chunk1);
  await knex('cities').insert(chunk2);
};
