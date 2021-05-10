require('dotenv').config();

const env = {
  botName: process.env.BOT_NAME,
  botPassword: process.env.BOT_PASSWORD,
  webChatServerUrl: process.env.WEB_CHAT_SERVER_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  stooqBaseUrl: process.env.STOOQ_BASE_URL,
}

module.exports = env;