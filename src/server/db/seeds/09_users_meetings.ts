import Knex from 'knex';
import {range} from 'lodash';

import {getRandomNum} from '../../../utils/getRandomNum';

const createUserMeetingRelation = async (u: number, e: number) => {
  const value = ['yes', 'no', 'maybe', null][getRandomNum(0, 3)];

  return {
    meetingId: e,
    type: 'private', // user rsvp type, not meeting type
    userId: u,
    value,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeUserEventRelations = [];

  for await (const i of range(1, 24)) {
    fakeUserEventRelations.push(await createUserMeetingRelation(1, i));
  }

  await knex('users_meetings').del();
  await knex('users_meetings').insert(fakeUserEventRelations);
};
