const redisUtil = require('./utils/redis');
const socketUtil = require('./utils/socket');

const startBot = async () => {
  redisUtil.createClient();
  await socketUtil.configSocket();
};

setImmediate(() => {
  startBot();
  console.log('Bot initialized');
});
