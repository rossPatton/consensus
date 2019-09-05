require('dotenv').config();
import bcrypt from 'bcryptjs';
import faker from 'faker';
import Knex from 'knex';

import { notNull } from '../../../utils/notNull';
import { slugify } from '../../../utils/slugify';
import cities from '../../json/usa/cities.json';
import stateMap from '../../json/usa/stateCodeMap.json';
import { encrypt, sha384 } from '../../utils';

const country = 'United States';

// in production, salt would be generated per hash, but this saves time
const salt = bcrypt.genSaltSync(10);

const createUser = async () => {
  const sha = sha384(faker.internet.password());
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    email: faker.internet.exampleEmail(),
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    password,
    phone: faker.phone.phoneNumber(),
    username: faker.internet.userName(),
  };
};

const createTestUser = async () => {
  const sha = sha384('test');
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    city: 3658, // New York City
    email: 'test@test.com',
    fname: 'test',
    isVerified: true,
    lname: 'user',
    password,
    phone: faker.phone.phoneNumber(),
    username: 'testUser',
  };
};

const createOrg = async () => {
  const name = faker.company.companyName();
  const slug = slugify(name);

  const sha = sha384(faker.internet.password());
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    category: faker.lorem.word(),
    city: 'New York City',
    cityId: 3658,
    country,
    countryId: 1,
    description: faker.lorem.paragraphs(),
    email: faker.internet.exampleEmail(),
    gate: 'public',
    membershipTotal: faker.random.number(),
    name,
    password,
    region: 'New York',
    regionId: 37,
    slug,
    username: faker.internet.userName(),
  };
};

const createEvent = async () => ({
  category: faker.company.bsNoun(),
  date: faker.date.future(),
  description: faker.lorem.paragraphs(),
  // endDate === duration, since users can have custom durations this is a timestamp
  // we convert the 1hr, 2hr etc values to timestamps as well
  endDate: faker.date.future(),
  goingCount: faker.random.number(),
  isPrivate: faker.random.boolean(),
  location: faker.address.streetAddress(),
  locationLink: faker.internet.url(),
  orgId: 100,
  orgName: 'Tech Workers Coalition NYC',
  title: faker.company.bs(),
});

const createUserOrgRelation = async (userId: number, orgId: number) => {
  const isMember = faker.random.boolean();
  const isTestAdmin = userId === 100 && orgId === 100;

  let role = isMember ? 'member' : null;
  if (isTestAdmin) role = 'admin';

  // if no role, dont create entry
  if (!role) return null;

  return {
    userId,
    orgId,
    role,
  };
};

const createUserEventRelation = async (u: number, e: number) => ({
  eventId: e,
  rsvp: faker.random.boolean(),
  userId: u,
});

const createTWC = async () => {
  const sha = sha384(faker.internet.password());
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    category: 'Tech and Science Activism',
    city: 'New York City',
    cityId: 3658,
    country,
    countryId: 1,
    description: faker.lorem.paragraphs(),
    email: 'techworkerscoalitionnyc@gmail.com',
    gate: 'restricted',
    membershipTotal: 1789,
    name: 'Tech Workers Coalition NYC',
    password,
    region: 'New York',
    regionId: 37,
    slug: 'tech-workers-coalition-nyc',
    username: 'twcNYC',
  };
};

const MAJORITY = 'Simple Majority';
const APPROVAL = 'Approval';
const createDecisionTypes = () => ([
  { type: MAJORITY },
  { type: APPROVAL },
]);

const createDecision = async (i: number) => {
  const type = i % 2 === 0 ? MAJORITY : APPROVAL;
  const data = type === MAJORITY
    ? {
      yes: faker.random.number(),
      no: faker.random.number(),
      abstain: faker.random.number(),
    }
    : {
      winners: 5,
      choices: [
        {
          count: faker.random.number(),
          label: 'person A',
        },
        {
          count: faker.random.number(),
          label: 'person B',
        },
        {
          count: faker.random.number(),
          label: 'person C',
        },
        {
          count: faker.random.number(),
          label: 'person D',
        },
        {
          count: faker.random.number(),
          label: 'person E',
        },
        {
          count: faker.random.number(),
          label: 'person F',
        },
        {
          count: faker.random.number(),
          label: 'person G',
        },
      ],
    };

  return {
    data,
    date: faker.date.past(),
    description: faker.lorem.paragraphs(),
    orgId: 100,
    title: faker.company.bs(),
    type,
  };
};

const createUserDecisionRelation = async (i: number) => ({
  decisionId: i,
  userId: 100,
});

exports.seed = async (knex: Knex) => {
  const fakeEvents = [];
  const fakeUsers = [];
  const fakeOrgs = [];
  const fakeDecisions = [];

  let fakeUserOrgRelations = [];
  const fakeUserEventRelations = [];
  const fakeUserDecisionRelations = [];

  let a = 1;
  for (a; a < 100; a++) {
    fakeOrgs.push(await createOrg());
  }

  let b = 1;
  for (b; b < 100; b++) {
    fakeUsers.push(await createUser());
  }

  // ids are both 100 for the test accounts
  fakeUsers.push(await createTestUser());
  fakeOrgs.push(await createTWC());

  let userId = 1;
  for (userId; userId <= 100; userId++) {
    let orgId = 1;
    for (orgId; orgId <= 100; orgId++) {
      fakeUserOrgRelations.push(await createUserOrgRelation(userId, orgId));
    }
  }

  fakeUserOrgRelations = fakeUserOrgRelations.filter(notNull);

  let d = 1;
  for (d; d < 50; d++) {
    fakeEvents.push(await createEvent());
    fakeUserEventRelations.push(await createUserEventRelation(100, d));
  }

  let g = 1;
  for (g; g <= 100; g++) {
    fakeDecisions.push(await createDecision(g));
  }

  let h = 1;
  for (h; h <= 100; h++) {
    fakeUserDecisionRelations.push(await createUserDecisionRelation(h));
  }

  const regions = [];

  // in our case, just states for now
  const createRegion = (key: string, value: string) => ({
    code: value.toLowerCase(),
    country: 1, // United States basically
    name: key,
  });

  for (const [key, value] of Object.entries(stateMap)) {
    regions.push(createRegion(key, value));
  }

  // only country supported atm
  const createUSA = async () => ({
    code: 'us',
    name: country,
    regionType: 'state',
  });

  const statesByName = Object.keys(stateMap);
  const createCity = (row: {city: string, state: string}) => {
    // arr index is 0 based, db is 1 based
    const region = statesByName.findIndex(state => state === row.state) + 1;
    return {
      name: row.city,
      region,
      country: 1, // United States basically
    };
  };

  await knex('countries').del();
  await knex('countries').insert(await createUSA());

  await knex('regions').del();
  await knex('regions').insert(regions);

  await knex('cities').del();
  await knex('cities').insert(cities.map(createCity));

  // we delete all rows from our tables to get a clean slate
  // if a previous migration or seed ran and it errored, you might to reset
  // the knex migration history in order to run this script again
  await knex('users').del();
  await knex('users').insert(fakeUsers);

  await knex('orgs').del();
  await knex('orgs').insert(fakeOrgs);

  await knex('decision_types').del();
  await knex('decision_types').insert(createDecisionTypes());

  await knex('decisions').del();
  await knex('decisions').insert(fakeDecisions);

  await knex('events').del();
  await knex('events').insert(fakeEvents);

  await knex('users_orgs').del();
  await knex('users_orgs').insert(fakeUserOrgRelations);

  await knex('users_events').del();
  await knex('users_events').insert(fakeUserEventRelations);

  await knex('users_decisions').del();
  await knex('users_decisions').insert(fakeUserDecisionRelations);
};
