const axios = require('axios').default;

const getStockQuoteFromCsv = csv => {
  const [, stockData] = csv.split('\n')
  const [symbol, date, time, open, high, low, close, volume] = stockData.split(',')

  return close;
}

const buildMessage = (stockCode, stockQuote) => `${stockCode.toUpperCase()} quote is $${stockQuote} per share.`

const requestStockQuote = async (stockCode) => {
  try {
    const url = `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`
    const response = await axios.get(url);
    const stockQuote = getStockQuoteFromCsv(response.data);
    
    if (stockQuote) {
      return buildMessage(stockCode, stockQuote);
    }

    // N/D

    return `I did not find the quote for ${stockCode.toUpperCase()}. Please, try again!`;
  } catch(err) {
    return `Sorry, I had a problem to find the quote for ${stockCode.toUpperCase()}.`
  }
}

const requestTokenApi = async ({ botname, botpassword }) => {
  try {
    const url = `http://localhost:3000/users/signIn`
    const { data: response } = await axios.post(url, {
      username: botname,
      password: botpassword,
    });

    return response.data.token;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  requestStockQuote,
  requestTokenApi,
}