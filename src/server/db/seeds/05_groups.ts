require('dotenv-safe').config();
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

  return {
    allowNonVerified: group.type === 'public',
    avatar: '',
    category,
    city: group.city,
    cityId: 16624,
    description: faker.lorem.paragraphs(),
    facebook: 'https://facebook.com',
    handle: group.handle,
    memberName: 'Member',
    modName: 'Facilitator',
    name: group.name,
    region: group.region,
    regionId: group.regionId,
    twitter: 'https://twitter.com',
    type: group.type,
    website: group.website || faker.internet.domainName(),
  };
};

exports.seed = async (knex: Knex) => {
  const fakeGroups = [];

  for await (const groupId of _.range(groups.length)) {
    fakeGroups.push(await createGroup(groupId));
  }

  await knex('groups').del();
  await knex('groups').insert(fakeGroups);
};
