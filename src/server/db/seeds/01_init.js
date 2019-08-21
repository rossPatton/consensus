require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { PEPPER } = process.env;

function encrypt(input) {
  const IV = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('AES-256-CTR', PEPPER, IV);
  cipher.setEncoding('base64');
  cipher.write(input);
  cipher.end();

  const cipherText = cipher.read();

  return `${cipherText}!${IV.toString('base64')}`;
}

function decrypt(input) {
  let result;
  const [cipherText, IV] = input.split('!');
  const buffIV = Buffer.from(IV, 'base64');
  const decipher = crypto.createDecipheriv('AES-256-CTR', PEPPER, buffIV);
  result = decipher.update(cipherText, 'base64', 'utf8');
  result += decipher.final('utf8');
  return result;
}

const sha384 = (input) => {
  const hasher = crypto.createHash('SHA384');
  hasher.update(input);
  return hasher.digest('base64');
};

const slugify = string => {
  if (typeof string !== 'string') return string;

  return string
    .replace(/\s+|\/+/gm, '-') // spaces and / => -
    .replace(/('|\(|\)|\.)+|#+|'+/gm, '') // '#' and () and ' => ''
    .replace(/-+/gm, '-') // repeating '-'s
    .toLowerCase()
    .trim();
};

const salt = bcrypt.genSaltSync(10);

const createUser = async () => {
  const sha = sha384(faker.internet.password());
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
  const sha = sha384('test');
  console.log('sha384 ', sha);
  console.log('length of sha384 => ', sha.length);
  const saltedHash = await bcrypt.hash(sha, salt);
  console.log('salted test hash => ', saltedHash);
  const password = encrypt(saltedHash);
  console.log('encryped hash => ', password);

  return {
    email: 'test@test.com',
    fname: 'test',
    lname: 'user',
    password,
    saltedHash,
    username: 'testUser',
  };
};

const createOrg = async () => {
  const orgName = faker.company.companyName();
  const slug = slugify(orgName);

  const sha = sha384(faker.internet.password());
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
  const sha = sha384(faker.internet.password());
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
