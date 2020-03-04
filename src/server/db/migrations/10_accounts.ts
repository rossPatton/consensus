import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('accounts', table => {
    table.increments('id').unsigned().primary();

    table.string('login').notNullable().unique();
    table.string('password').notNullable();

    // if user type
    table.integer('userId')
      .unique()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if org type
    table.integer('orgId')
      .unique()
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if user puts their email in, we can verify that they're a real person
    table.boolean('isVerified').defaultTo(false);

    // temporary string used for resetting account password
    // once password is reset, token is set back to ''
    table.string('passwordResetToken').defaultTo(null);
    // if user does not reset their password in time, the token is invalidated
    table.timestamp('passwordResetExpires').defaultTo(null);

    // temporary string used for verifying that the account is tied to a real person
    // once verified, token is set back to ''
    // email change requires new verification
    table.string('verificationToken').defaultTo(null);
    // if user does not verify in time, the token is invalidated
    // and a new one must be generated
    table.timestamp('verificationExpires').defaultTo(null);

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts');
};
