const api = require('./api');

const buildSuccessMessage = (stockCode, stockQuote) => 
  `${stockCode.toUpperCase()} quote is $${stockQuote} per share.`

const buildFailureMessage = (stockCode) => 
  `I had problems to find the ${stockCode.toUpperCase()} quote. I'm sorry!`

const buildUnavailableMessage = (stockCode) =>
  `Quote for ${stockCode.toUpperCase()} is unavailable.`

const buildEmptyMessage = () => 'Stock code is empty, send one.'

const buildMessage = (stockQuote, stockCode) => {
  let message;

  if (!stockQuote) {
    message = buildFailureMessage(stockCode);
  } else if (stockQuote === 'N/D') {
    message = buildUnavailableMessage(stockCode);
  } else {
    message = buildSuccessMessage(stockCode, stockQuote);
  }

  return message;
}

const getStockQuoteMessage = async (stockCode) => {
  try {
    if (stockCode) {
      const stockQuote = await api.requestStockQuote(stockCode);

      return buildMessage(stockQuote, stockCode);
    }

    return buildEmptyMessage();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getStockQuoteMessage,
}
