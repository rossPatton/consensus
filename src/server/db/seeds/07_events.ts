require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';
import {flatten, range as loRange} from 'lodash';

import orgs from '../../../json/orgs.json';
import {range} from '../../../utils/range';
import {slugify} from '../../../utils/slugify';

const createMeeting = async (orgId: number, isDraft: boolean = false) => {
  const org = orgs[orgId - 1];
  const meetingsPerOrg = isDraft ? [1, 2, 3] : loRange(1, orgId === 1 ? 25 : 3);

  return meetingsPerOrg.map(() => {
    const title = faker.lorem.words(5);
    const slug = slugify(title);

    return {
      category: org.category,
      cityId: org.cityId,
      date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
      description: faker.lorem.paragraphs(),
      // endDate === duration, since users can have custom durations this is a timestamp
      // we convert the 1hr, 2hr etc values to timestamps as well
      endDate: faker.date.future(),
      isDraft,
      isPrivate: org.type !== 'public',
      location: faker.address.streetAddress(),
      locationLink: faker.internet.url(),
      orgId,
      orgName: org.name,
      pathToFeaturedImage: faker.image.imageUrl(),
      slug,
      title,
    };
  });
};

exports.seed = async (knex: Knex) => {
  const fakeEvents = [];

  for await (const orgId of range(100, true)) {
    fakeEvents.push(await createMeeting(orgId));
  }

  for await (const orgId of range(100, true)) {
    fakeEvents.push(await createMeeting(orgId, true));
  }

  await knex('events').del();
  await knex('events').insert(flatten(fakeEvents));
};
