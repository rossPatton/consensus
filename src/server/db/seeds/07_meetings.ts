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
    const isOnline = faker.random.boolean();

    return {
      // endDate === duration, since users can have custom durations this is a timestamp
      // we convert the 1hr, 2hr etc values to timestamps as well
      category: group.category,
      cityId: group.cityId,
      date: faker.random.boolean() ? faker.date.future() : faker.date.past(),
      description: faker.lorem.paragraphs(),
      endDate: faker.date.future(),
      groupId,
      groupName: group.name,
      host: faker.random.boolean() ? group.name : faker.company.companyName(),
      isDraft,
      isOnline: isOnline,
      isPrivate: group.type !== 'public',
      location: isOnline ? '' : faker.address.streetAddress(),
      locationLink: isOnline ? '' : faker.internet.url(),
      locationType: isOnline ? 'online' : 'offline',
      slug,
      tag: 'Meeting',
      title,
    };
  });
};

export const seed = async (knex: Knex) => {
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
