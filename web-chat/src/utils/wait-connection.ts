import isPortReachable from 'is-port-reachable';

import env from './env';
import knexfile = require('../../knexfile');

const config = knexfile[env.nodeEnv];

async function init() {
  console.log('Verifying database connection');

  let status = false;

  while (!status) {
    // eslint-disable-next-line no-await-in-loop
    status = await isPortReachable(config.connection.port, { host: config.connection.host });
  }

  console.log('Database is up');
}

init();
