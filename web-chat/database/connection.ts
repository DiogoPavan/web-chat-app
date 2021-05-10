import knex from 'knex';
import env from '../src/utils/env';
import knexfile = require('../knexfile');

const connection = knex(knexfile[env.nodeEnv]);

export default connection;
