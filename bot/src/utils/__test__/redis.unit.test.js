const redis = require('redis');
const redisUtils = require('../redis');

jest.mock('redis', () => ({
  createClient: jest.fn(),
}));

describe('redisUtil', () => {
  describe('createClient', () => {
    it('should create redis with success', async () => {
      redisUtils.createClient();

      expect(redis.createClient).toHaveBeenCalled();
    });
  });

  describe('getRedisClient', () => {
    it('should get redis client with success', async () => {
      const redisClient = {
        host: 'host',
      };
      const spy = jest.spyOn(redisUtils, 'getRedisClient');
      spy.mockReturnValue(redisClient);

      const result = redisUtils.getRedisClient();

      expect(result).toEqual(redisClient);
    });
  });
});
