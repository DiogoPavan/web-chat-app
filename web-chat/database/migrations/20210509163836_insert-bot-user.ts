import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex('users').insert({
    id: knex.raw('(UUID())'),
    username: 'Bot',
    password: '$2b$10$NoHHfUi5ERIV34n7IxwdP.0pqp5eWVi.LpmE3.nwHSR7e6wv8KRYW'
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex('users').where({
    username: 'Bot',
  }).del();
}
