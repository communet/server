import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chats', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table
      .string('channel_id')
      .notNullable()
      .references('id')
      .inTable('channels');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chats');
}
