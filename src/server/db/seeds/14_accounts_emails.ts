import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createRelation = async (id: number) => ({
  accountId: id,
  email: faker.internet.email(
    faker.name.firstName(),
    faker.name.lastName(),
    'gmail.com',
  ),
});

exports.seed = async (knex: Knex) => {
  const fakeRelations = [];

  for await (const accountId of range(99, true)) {
    fakeRelations.push(await createRelation(accountId));
  }

  // create test user facilitator account
  fakeRelations.push(await createRelation(100));

  // create test org admin account
  fakeRelations.push(await createRelation(101));

  await knex('accounts_emails').del();
  await knex('accounts_emails').insert(fakeRelations);
};
