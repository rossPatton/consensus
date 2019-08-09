const bcrypt = require('bcrypt');
const faker = require('faker');

const slugify = string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/\s+|\/+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.)+|#+|'+/gm, '') // '#' and () and ' => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};

// TODO dont use sync methods (at least, for the hashes)
const salt = bcrypt.genSaltSync();

const createUser = async () => ({
  email: faker.internet.exampleEmail(),
  fname: faker.name.firstName(),
  lname: faker.name.lastName(),
  password: await bcrypt.hash(faker.internet.password(), salt),
  username: faker.internet.userName(),
});

const createTestUser = async () => ({
  email: 'test@test.com',
  fname: 'test',
  lname: 'user',
  password: await bcrypt.hash('test', salt),
  username: 'testUser',
});

const createOrg = async () => {
  const orgName = faker.company.companyName();
  const slug = slugify(orgName);

  return {
    category: faker.lorem.word(),
    city: faker.address.city(),
    count: faker.random.number(),
    country: faker.address.country(),
    description: faker.lorem.paragraphs(),
    email: faker.internet.exampleEmail(),
    orgName,
    password: await bcrypt.hash(faker.internet.password(), salt),
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
    interestedCount: faker.random.number(),
    location: faker.address.streetAddress(),
    orgId: 100,
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
  const going = faker.random.boolean();

  // additional random boolean + not going, then say interested
  const interested = faker.random.boolean() && !going;

  return {
    eventId: e,
    going,
    interested,
    userId: u,
  };
};

const createTWC = async () => ({
  category: 'Tech and Science Activism',
  city: 'nyc',
  count: 1789,
  country: 'us',
  description: faker.lorem.paragraphs(),
  email: 'techworkerscoalitionnyc@gmail.com',
  orgName: 'Tech Workers Coalition NYC',
  password: await bcrypt.hash(faker.internet.password(), salt),
  slug: 'tech-workers-coalition',
  state: 'ny',
  username: 'twc-ny',
});

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
  for (d; d < 20; d++) {
    fakeEvents.push(await createEvent());
    fakeUserEventRelations.push(await createUserEventRelation(100, d));
  }

  // u for user, e for event. loop through both to get a good spread
  let e = 1;
  for (e; e <= 100; e++) {

    let f = 1;
    for (f; f < 20; f++) {
      fakeUserEventRelations.push(await createUserEventRelation(e, f));
    }
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
