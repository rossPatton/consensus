require('dotenv').config();
import Knex from 'knex';

import citiesMap from '../../json/usa/cities.json';
import stateMap from '../../json/usa/stateCodeMap.json';

const statesByName = Object.keys(stateMap);
const createCity = async (row: {city: string, state: string}) => {
  // arr index is 0 based, db is 1 based
  const region = statesByName.findIndex(state => state === row.state) + 1;
  return {
    name: row.city,
    region,
    country: 1, // United States basically
  };
};

exports.seed = async (knex: Knex) => {
  const cities = await Promise.all(citiesMap.map(createCity));

  await knex('cities').del();
  await knex('cities').insert(cities);
};
