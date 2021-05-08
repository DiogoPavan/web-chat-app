import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex('rooms').insert([
    {
      id: knex.raw('(UUID())'),
      name: 'Tech'
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Business'
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Sports'
    }
  ])
}

export async function down(knex: Knex): Promise<void> {
  return knex('rooms').del();
}

