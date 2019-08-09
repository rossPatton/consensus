exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    table.string('email').notNullable();
    table.string('password').notNullable();

    table.string('fname');
    table.string('lname');
    table.string('username').unique().notNullable();

    table.timestamp('lastActive').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('orgs', table => {
    table.increments().unsigned().primary();

    table.string('category').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.integer('count').unsigned().notNullable().defaultTo(0);
    table.text('description', 'longtext').notNullable();
    table.string('email').notNullable();
    table.string('orgName').notNullable();
    table.string('slug').notNullable();
    table.string('password').notNullable();
    table.string('state').notNullable();
    table.string('username').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users_orgs', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId').notNullable().references('users.id');
    table.integer('orgId').notNullable().references('orgs.id');

    // roles can be of one of type 'member' | 'admin'
    table.string('role').notNullable().defaultTo('member');
  });

  await knex.schema.createTable('events', table => {
    table.increments().unsigned().primary();

    table.string('category').notNullable();
    table.integer('orgId').notNullable().references('orgs.id');

    table.text('description', 'longtext').notNullable();
    table.text('location').defaultTo('Location To Be Determined');
    table.text('title').notNullable();

    table.timestamp('date').notNullable();
    table.timestamp('endDate').notNullable();

    table.integer('goingCount').unsigned().notNullable().defaultTo(0);
    table.integer('interestedCount').unsigned().notNullable().defaultTo(0);

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users_events', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId').notNullable().references('users.id');
    table.integer('eventId').notNullable().references('events.id');

    table.boolean('attended').defaultTo(false);
    table.boolean('going').defaultTo(false);
    table.boolean('interested').defaultTo(false);
  });

  await knex.schema.createTable('decision_types', table => {
    table.string('type').notNullable().defaultTo('Simple Majority').primary();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('decisions', table => {
    table.increments().unsigned().primary();

    // the org that made the decision / poll
    table.integer('orgId').notNullable().references('orgs.id');

    // the type of voting system the decision used (defaults to simple majority)
    table.string('type').notNullable().references('decision_types.type');

    table.text('description', 'longtext').notNullable();
    table.text('minutes', 'longtext');
    table.text('rationale');
    table.text('title').notNullable();
    table.timestamp('date').notNullable();

    // data is different for every poll, but the shape of the data
    // is determined by the poll type
    table.jsonb('data').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users_decisions', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').notNullable().references('users.id');
    table.integer('decisionId').notNullable().references('decisions.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('decision_types');
  await knex.schema.dropTable('decisions');
  await knex.schema.dropTable('events');
  await knex.schema.dropTable('orgs');
  await knex.schema.dropTable('users_decisions');
  await knex.schema.dropTable('users_events');
  await knex.schema.dropTable('users_orgs');
  await knex.schema.dropTable('users');
};
