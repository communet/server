import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('channels', (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable('channels', (table) => {
    table.string('id').notNullable().alter();
  });

  await knex.schema.alterTable('channels', (table) => {
    table.primary(['id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('channels', (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable('channels', (table) => {
    table.uuid('id').notNullable().alter();
  });

  await knex.schema.alterTable('channels', (table) => {
    table.primary(['id']);
  });
}
