import knex from 'knex';
import knexfile = require('../knexfile');
import env from '../src/utils/env';

const connection = knex(knexfile[env.nodeEnv]);

export default connection;
