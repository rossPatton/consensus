require('dotenv').config();
const bcrypt = require('bcrypt');
const faker = require('faker');
const { sha256 } = require('js-sha256');

const slugify = string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/\s+|\/+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.)+|#+|'+/gm, '') // '#' and () and ' => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};

// add a little pepper to the salt - hard coded server key for extra security
const { PEPPER } = process.env;

console.log('PEPPER => ', PEPPER);

const salt = bcrypt.genSaltSync(10);

const createUser = async () => {
  const sha = sha256(faker.internet.password() + PEPPER);
  const password = await bcrypt.hash(sha, salt);

  return {
    email: faker.internet.exampleEmail(),
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    password,
    username: faker.internet.userName(),
  };
};

const createTestUser = async () => {
  const sha = sha256('test' + PEPPER);
  const password = await bcrypt.hash(sha, salt);

  return {
    email: 'test@test.com',
    fname: 'test',
    lname: 'user',
    password,
    username: 'testUser',
  };
};

const createOrg = async () => {
  const orgName = faker.company.companyName();
  const slug = slugify(orgName);

  const sha = sha256(faker.internet.password());
  const password = await bcrypt.hash(sha, salt);

  return {
    category: faker.lorem.word(),
    city: faker.address.city(),
    count: faker.random.number(),
    country: faker.address.country(),
    description: faker.lorem.paragraphs(),
    email: faker.internet.exampleEmail(),
    orgName,
    password,
    slug,
    state: faker.address.state(),
    username: faker.internet.userName(),
  };
};

const createEvent = async () => {
  const orgName = faker.company.companyName();
  const slug = slugify(orgName);

  return {
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
  };
};

const createUserOrgRelation = async i => ({
  userId: i,
  orgId: 100,
  role: 'admin',
});

const createUserEventRelation = async (u, e) => {
  // random bool for going
  const didAttend = faker.random.boolean();

  return {
    didAttend,
    eventId: e,
    isGoing: !didAttend && faker.random.boolean(),
    userId: u,
  };
};

const createTWC = async () => {
  const sha = sha256(faker.internet.password());
  const password = await bcrypt.hash(sha, salt);

  return {
    category: 'Tech and Science Activism',
    city: 'nyc',
    count: 1789,
    country: 'us',
    description: faker.lorem.paragraphs(),
    email: 'techworkerscoalitionnyc@gmail.com',
    orgName: 'Tech Workers Coalition NYC',
    password,
    slug: 'tech-workers-coalition',
    state: 'ny',
    username: 'twc-ny',
  };
};

const createDecisionTypes = () => ([
  { type: 'Simple Majority' },
  { type: 'Approval' },
]);

const createDecision = async (i) => {
  const type = i % 2 === 0 ? 'Simple Majority' : 'Approval';
  const data = type === 'Simple Majority'
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

const createUserDecisionRelation = async (i) => ({
  decisionId: i,
  userId: 100,
});

exports.seed = async (knex, Promise) => {
  const fakeEvents = [];
  const fakeUsers = [];
  const fakeOrgs = [];
  const fakeDecisions = [];

  const fakeUserOrgRelations = [];
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

  let c = 1;
  for (c; c <= 100; c++) {
    fakeUserOrgRelations.push(await createUserOrgRelation(c));
  }

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
