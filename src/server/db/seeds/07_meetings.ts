require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';
import {flatten, range} from 'lodash';

import groups from '../../../json/groups.json';
import {slugify} from '../../../utils/strings';

const createMeeting = async (groupId: number, isDraft: boolean = false) => {
  const group = groups[groupId - 1];
  const meetingsPerOrg = isDraft ? [1, 2, 3] : range(1, groupId === 1 ? 25 : 3);

  return meetingsPerOrg.map(() => {
    const title = faker.lorem.words(5);
    const slug = slugify(title);

    return {
      category: group.category,
      cityId: group.cityId,
      date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
      description: faker.lorem.paragraphs(),
      // endDate === duration, since users can have custom durations this is a timestamp
      // we convert the 1hr, 2hr etc values to timestamps as well
      endDate: faker.date.future(),
      isDraft,
      isPrivate: group.type !== 'public',
      location: faker.address.streetAddress(),
      locationLink: faker.internet.url(),
      groupId,
      groupName: group.name,
      pathToFeaturedImage: faker.image.imageUrl(),
      slug,
      title,
    };
  });
};

exports.seed = async (knex: Knex) => {
  const fakeMeetings = [];

  for await (const groupId of range(1, 100)) {
    fakeMeetings.push(await createMeeting(groupId));
  }

  for await (const groupId of range(1, 100)) {
    fakeMeetings.push(await createMeeting(groupId, true));
  }

  await knex('meetings').del();
  await knex('meetings').insert(flatten(fakeMeetings));
};
