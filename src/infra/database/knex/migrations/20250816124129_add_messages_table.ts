import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.string('id').primary();
    table.string('body').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.string('sender_id').notNullable().references('id').inTable('users');
    table.string('chat_id').notNullable().references('id').inTable('chats');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
