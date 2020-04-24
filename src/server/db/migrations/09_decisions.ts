import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('decisions', table => {
    table.increments().unsigned().primary();
    table.timestamps(true, true);

    // the org that made the decision / poll
    table.integer('groupId').notNullable().references('groups.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('groupName').notNullable();

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

    // data is different for every poll, the shape of the
    // options object is determined by the poll type
    // @ts-ignore
    table.jsonb('data').notNullable().defaultTo({options: {}});
    table.integer('potentialWinners').unsigned().notNullable().defaultTo(1);

    table.boolean('isDraft').notNullable().defaultTo(true);
    table.boolean('isClosed').notNullable().defaultTo(false);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('decisions');
};
