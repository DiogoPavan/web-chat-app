import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rooms', (table) => {
    table.uuid('id').primary();
    table.string('name', 200).unique().notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(
      knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rooms');
}

