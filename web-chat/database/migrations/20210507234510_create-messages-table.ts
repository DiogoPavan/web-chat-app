import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary();
    table.uuid('userId').notNullable().references('id').inTable('users');
    table.uuid('roomId').notNullable().references('id').inTable('rooms');
    table.string('message').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}

