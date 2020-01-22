require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createEvent = async () => ({
  date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
  description: faker.lorem.paragraphs(),
  // endDate === duration, since users can have custom durations this is a timestamp
  // we convert the 1hr, 2hr etc values to timestamps as well
  endDate: faker.date.future(),
  isDraft: faker.random.boolean(),
  isPrivate: faker.random.boolean(),
  location: faker.address.streetAddress(),
  locationLink: faker.internet.url(),
  orgId: 100,
  orgName: 'Tech Workers Coalition NYC',
  pathToFeaturedImage: faker.image.imageUrl(),
  title: faker.company.bs(),
});

exports.seed = async (knex: Knex) => {
  const fakeEvents = [];

  for await (const _ of range(150, true)) {
    fakeEvents.push(await createEvent());
  }

  await knex('events').del();
  await knex('events').insert(fakeEvents);
};
