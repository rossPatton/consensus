import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('decisions', table => {
    table.increments().unsigned().primary();

    // the org that made the decision / poll
    table.integer('orgId').notNullable().references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('orgName').notNullable();

    // the type of voting system the decision used (defaults to simple majority)
    table.string('type')
      .notNullable()
      .references('decision_types.type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.text('description', 'longtext').notNullable();
    table.text('title').notNullable();

    // when the vote will end
    table.timestamp('deadline').notNullable();

    // data is different for every poll, but the shape of the data
    // is determined by the poll type
    table.jsonb('options').notNullable();
    // @ts-ignore
    table.jsonb('results').notNullable().defaultTo({});
    table.jsonb('finalWinners').defaultTo(null);

    table.integer('potentialWinners').unsigned().notNullable().defaultTo(1);

    table.boolean('isDraft').notNullable().defaultTo(true);
    table.boolean('isClosed').notNullable().defaultTo(false);

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('decisions');
};
