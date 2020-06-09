import Knex from 'knex';
import _ from 'lodash';
import memoizee from 'memoizee';

import {pg} from '~app/server/db/connection';

const getCities = async (region: string, trx?: Knex.Transaction) => {
  const cities = pg('cities');
  if (trx) {
    cities.transacting(trx);
  }

  return cities.where({region}).orderBy('name', 'asc');
};

export const getCitiesQuery = memoizee(getCities, {async: true});
