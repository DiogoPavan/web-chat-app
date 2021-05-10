const redis = require('redis');
const {
  redisHost,
  redisPort,
} = require('./env');

let redisClient;

const createClient = () => {
  redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
  });
};

const getRedisClient = () => redisClient;

module.exports = {
  createClient,
  getRedisClient
}