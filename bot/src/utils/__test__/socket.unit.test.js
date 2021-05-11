const Chance = require('chance');
const io = require('socket.io-client');
const socketUtil = require('../socket');
const {
  requestTokenApi,
} = require('../api');

jest.mock('../api');
jest.mock('socket.io-client', () => jest.fn());

describe('socketUtil', () => {
  const chance = new Chance();

  describe('configSocket', () => {
    it('should config socket with success', async () => {
      const token = chance.string();
      const requestTokenApiSpy = jest.fn().mockResolvedValue(token);
      const socket = {
        emit: jest.fn(),
        on: jest.fn(),
      };

      io.mockImplementation(() => socket);

      requestTokenApi.mockImplementation(() => requestTokenApiSpy());

      await socketUtil.configSocket();

      expect(socket.emit).toHaveBeenCalled();
      expect(socket.on).toHaveBeenCalled();
    });
  });
});
