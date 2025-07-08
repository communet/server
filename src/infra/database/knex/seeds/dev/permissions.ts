import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('permissions').del();

  await knex('permissions').insert([
    { id: 'create_channel' },
    { id: 'delete_channel' },
    { id: 'update_channel' },
    { id: 'read_channel' },
    { id: 'update_profile' },
  ]);
}
