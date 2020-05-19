import faker from 'faker';
import Knex from 'knex';
import {range} from 'lodash';

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

  // create test user facilitator account
  fakeRelations.push(await createRelation(1));

  // create test org admin account
  fakeRelations.push(await createRelation(2));

  for await (const accountId of range(3, 100)) {
    fakeRelations.push(await createRelation(accountId));
  }

  await knex('accounts_emails').del();
  await knex('accounts_emails').insert(fakeRelations);
};
