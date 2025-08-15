import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('channels', (table) => {
    table.dropForeign('creator_id');
  });

  await knex.schema.alterTable('users', (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable('users', (table) => {
    table.string('id').notNullable().alter();
  });

  await knex.schema.alterTable('users', (table) => {
    table.primary(['id']);
  });

  await knex.schema.alterTable('channels', (table) => {
    table.string('creator_id').alter();
    table
      .foreign('creator_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('channels', (table) => {
    table.dropForeign('creator_id');
  });

  await knex.schema.alterTable('users', (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable('users', (table) => {
    table.uuid('id').notNullable().alter();
  });

  await knex.schema.alterTable('users', (table) => {
    table.primary(['id']);
  });

  await knex.schema.alterTable('channels', (table) => {
    table.uuid('creator_id').alter();
    table
      .foreign('creator_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}
