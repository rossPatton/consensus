import Knex from 'knex';
import _ from 'lodash';

import citiesMap from '../../../json/usa/cities.json';
import stateNameToCodeMap from '../../../json/usa/stateNameToCodeMap.json';

const statesByName = Object.keys(stateNameToCodeMap);
const createCity = async (row: {city: string, state: string}) => {
  // arr index is 0 based, db is 1 based
  const regionId = statesByName.findIndex(state => state === row.state) + 1;
  const regionCode = (stateNameToCodeMap as {[k: string]: unknown})[row.state];

  return {
    name: row.city,
    region: row.state,
    regionCode,
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
