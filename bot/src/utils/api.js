const axios = require('axios').default;
const {
  botName,
  botPassword,
  webChatServerUrl,
  stooqBaseUrl,
} = require('./env');

const getStockQuoteFromCsv = (csv) => {
  const [, stockData] = csv.split('\n');
  const { 6: close } = stockData.split(',');

  return close;
};

const requestStockQuote = async (stockCode) => {
  try {
    const url = `${stooqBaseUrl}&s=${stockCode}`;
    const response = await axios.get(url);

    return getStockQuoteFromCsv(response.data);
  } catch (err) {
    return null;
  }
};

const requestTokenApi = async () => {
  try {
    const { data: response } = await axios.post(`${webChatServerUrl}/users/signIn`, {
      username: botName,
      password: botPassword,
    });

    return response.data.token;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  requestStockQuote,
  requestTokenApi,
};
