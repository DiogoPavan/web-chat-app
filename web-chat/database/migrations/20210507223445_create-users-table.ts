import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('username', 200).notNullable();
    table.string('password').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(
      knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
