require('dotenv-safe').config();
import Knex from 'knex';

// import postcodes from '../../../json/usa/zips.json';

// const createCode = async (row: {city: string, state: string}) => {
// arr index is 0 based, db is 1 based
// const region = statesByName.findIndex(state => state === row.state) + 1;
// return {
//   name: row.city,
//   region,
//   country: 1, // United States basically
// };
// };

exports.seed = async (knex: Knex) => {
  // const codes = await Promise.all(postcodes.map(createCity));

  await knex('postcodes').del();
  await knex('postcodes').insert([]);
};
