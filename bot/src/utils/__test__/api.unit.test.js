const nock = require('nock');
const Chance = require('chance');
const {
  webChatServerUrl,
} = require('../env');
const axiosUtil = require('../api');

describe('apiUtil', () => {
  const chance = new Chance();

  describe('requestStockQuote', () => {
    it('should request stock quote with success', async () => {
      nock('https://stooq.com')
        .get('/q/l/?f=sd2t2ohlcv&h&e=csv&s=AAPL.US')
        .reply(200, `Symbol,Date,Time,Open,High,Low,Close,Volume
          AAPL.US,2021-05-11,22:00:06,123.5,126.27,122.77,125.91,125990723
      `);

      const result = await axiosUtil.requestStockQuote('AAPL.US');

      expect(result).toEqual('125.91');
    });

    it('should throw an error when try to request stock quote', async () => {
      nock('https://stooq.com')
        .get('/q/l/?f=sd2t2ohlcv&h&e=csv&s=AAPL.US')
        .reply(500);

      const result = await axiosUtil.requestStockQuote('AAPL.US');

      expect(result).toEqual(null);
    });
  });

  describe('requestTokenApi', () => {
    it('should request token with success', async () => {
      const token = chance.string();
      nock(`${webChatServerUrl}`)
        .post('/users/signIn')
        .reply(200, {
          data: {
            token,
          },
        });

      const result = await axiosUtil.requestTokenApi();

      expect(result).toEqual(token);
    });

    it('should throw an error when try to request request token', async () => {
      nock(`${webChatServerUrl}`)
        .post('/users/signIn')
        .reply(500);

      await expect(axiosUtil.requestTokenApi()).rejects.toThrow();
    });
  });
});
