import Knex from 'knex';

import stateMap from '../../../json/usa/stateNameToCodeMap.json';

// in our case, just states for now
const createRegion = async (key: string, value: string) => ({
  code: value.toLowerCase(),
  name: key,
});

exports.seed = async (knex: Knex) => {
  const regions = await Promise.all(
    Object.entries(stateMap).map(
      ([k, v]) => createRegion(k, v),
    ),
  );

  await knex('regions').del();
  await knex('regions').insert(regions);
};
