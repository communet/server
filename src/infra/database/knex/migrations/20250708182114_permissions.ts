import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('permissions', (table) => {
    table.string('id').primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('permissions');
}
