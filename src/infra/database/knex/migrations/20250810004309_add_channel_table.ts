import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('channels', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.uuid('creator_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channels');
}
