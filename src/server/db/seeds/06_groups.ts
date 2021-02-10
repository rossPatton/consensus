import faker from 'faker';
import Knex from 'knex';
import _ from 'lodash';

import groups from '../../../json/groups.json';
import {getRandomNum} from '../../../utils/getRandomNum';
const categories = [
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
];

const createGroup = async (groupId: number) => {
  const group = groups[groupId];
  const category = groupId === 0
    ? 'Political'
    : categories[getRandomNum(0, categories.length - 1)].type;

  const email = faker.internet.email(
    faker.name.firstName(),
    faker.name.lastName(),
    'gmail.com',
  );

  return {
    avatar: groupId === 0 ? '2' : getRandomNum(1, 7),
    category,
    city: group.city,
    cityId: 16624,
    description: faker.lorem.paragraphs(),
    email: groupId === 0 ? 'rosspatton@protonmail.com' : email,
    facebook: `https://${faker.internet.domainName()}`,
    handle: group.handle,
    memberName: 'Member',
    modName: 'Facilitator',
    name: group.name,
    region: group.region,
    regionId: group.regionId,
    twitter: `https://${faker.internet.domainName()}`,
    type: group.type,
    website: group.website || `https://${faker.internet.domainName()}`,
  };
};

export const seed = async (knex: Knex) => {
  const fakeGroups = [];

  for await (const groupId of _.range(groups.length)) {
    fakeGroups.push(await createGroup(groupId));
  }

  await knex('groups').del();
  await knex('groups').insert(fakeGroups);
};
