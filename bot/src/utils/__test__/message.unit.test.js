const messageUtil = require('../message');
const {
  requestStockQuote,
} = require('../api');

jest.mock('../api');

describe('messageUtil', () => {
  let stockCode;
  let stockQuote;

  beforeAll(() => {
    stockCode = 'AAPL.US';
    stockQuote = 10;
  });

  describe('getStockQuoteMessage', () => {
    it('should send empty message when there is no stockCode', async () => {
      const message = await messageUtil.getStockQuoteMessage();

      expect(message).toEqual('Stock code is empty, send one.');
    });

    it('should call stock quote and build failure message', async () => {
      const requestStockQuoteSpy = jest.fn().mockResolvedValue(null);
      requestStockQuote.mockImplementation(() => requestStockQuoteSpy());

      const message = await messageUtil.getStockQuoteMessage(stockCode);

      expect(message).toEqual(`I had problems to find the ${stockCode} quote. I'm sorry!`);
    });

    it('should call stock quote and build unavailable message', async () => {
      const requestStockQuoteSpy = jest.fn().mockResolvedValue('N/D');
      requestStockQuote.mockImplementation(() => requestStockQuoteSpy());

      const message = await messageUtil.getStockQuoteMessage(stockCode);

      expect(message).toEqual(`Quote for ${stockCode} is unavailable.`);
    });

    it('should call stock quote and build success message', async () => {
      const requestStockQuoteSpy = jest.fn().mockResolvedValue(stockQuote);
      requestStockQuote.mockImplementation(() => requestStockQuoteSpy());

      const message = await messageUtil.getStockQuoteMessage(stockCode);

      expect(message).toEqual(`${stockCode} quote is $${stockQuote} per share.`);
    });

    it('should throw an error when try to get stock quote message', async () => {
      const requestStockQuoteSpy = jest.fn(() => {
        throw new Error('Error');
      });
      requestStockQuote.mockImplementation(() => requestStockQuoteSpy());

      await expect(messageUtil.getStockQuoteMessage(stockCode)).rejects.toThrow('Error');
    });
  });
});
