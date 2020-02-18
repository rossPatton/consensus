require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createMeeting = async (orgId: number) => ({
  cityId: 16624,
  date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
  description: faker.lorem.paragraphs(),
  // endDate === duration, since users can have custom durations this is a timestamp
  // we convert the 1hr, 2hr etc values to timestamps as well
  endDate: faker.date.future(),
  isDraft: false,
  location: faker.address.streetAddress(),
  locationLink: faker.internet.url(),
  orgId,
  orgName: orgId === 100 ? 'Tech Workers Coalition NYC' : '',
  pathToFeaturedImage: faker.image.imageUrl(),
  title: faker.company.bs(),
});

const createDraft = async () => ({
  cityId: 16624,
  date: faker.date.future(),
  description: faker.lorem.paragraphs(),
  // endDate === duration, since users can have custom durations this is a timestamp
  // we convert the 1hr, 2hr etc values to timestamps as well
  endDate: faker.date.future(),
  isDraft: true,
  location: faker.address.streetAddress(),
  locationLink: faker.internet.url(),
  orgId: 100,
  orgName: 'Tech Workers Coalition NYC',
  pathToFeaturedImage: faker.image.imageUrl(),
  title: faker.company.bs(),
});

exports.seed = async (knex: Knex) => {
  const fakeEvents = [];

  for await (const _ of range(50, true)) {
    for await (const orgId of range(100, true)) {
      fakeEvents.push(await createMeeting(orgId));
    }
  }

  for await (const _ of range(10, true)) {
    fakeEvents.push(await createDraft());
  }

  await knex('events').del();
  await knex('events').insert(fakeEvents);
};
