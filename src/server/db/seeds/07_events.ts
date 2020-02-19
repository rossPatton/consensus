require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import orgs from '../../../json/orgs.json';
import {range} from '../../../utils/range';

const createMeeting = async (orgId: number) => {
  const org = orgs[orgId - 1];

  return {
    cityId: org.cityId,
    date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
    description: faker.lorem.paragraphs(),
    // endDate === duration, since users can have custom durations this is a timestamp
    // we convert the 1hr, 2hr etc values to timestamps as well
    endDate: faker.date.future(),
    isDraft: false,
    isPrivate: org.type !== 'public',
    location: faker.address.streetAddress(),
    locationLink: faker.internet.url(),
    orgId,
    orgName: org.name,
    pathToFeaturedImage: faker.image.imageUrl(),
    title: faker.company.bs(),
  };
};

const createDraft = async (orgId: number) => {
  const org = orgs[orgId - 1];

  return {
    cityId: org.cityId,
    date: faker.date.future(),
    description: faker.lorem.paragraphs(),
    // endDate === duration, since users can have custom durations this is a timestamp
    // we convert the 1hr, 2hr etc values to timestamps as well
    endDate: faker.date.future(),
    isDraft: true,
    isPrivate: org.type !== 'public',
    location: faker.address.streetAddress(),
    locationLink: faker.internet.url(),
    orgId,
    orgName: org.name,
    pathToFeaturedImage: faker.image.imageUrl(),
    title: faker.company.bs(),
  };
};

exports.seed = async (knex: Knex) => {
  const fakeEvents = [];

  for await (const _ of range(25, true)) {
    for await (const orgId of range(100, true)) {
      fakeEvents.push(await createMeeting(orgId));
    }
  }

  for await (const _ of range(10, true)) {
    for await (const orgId of range(100, true)) {
      fakeEvents.push(await createDraft(orgId));
    }
  }

  await knex('events').del();
  await knex('events').insert(fakeEvents);
};
