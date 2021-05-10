const io = require('socket.io-client');
const apiUtil = require('./api');
const messageUtil = require('./message');
const redisUtil = require('./redis');
const {
  webChatServerUrl,
  botName,
} = require('./env');

const listenMessage = async (data) => {
  const STOCK_PATTERN = /\/stock=([^\s]*)/;

  if (data.message.match(STOCK_PATTERN)) {
    const [, stockCode] = data.message.split('=');
    const message = await messageUtil.getStockQuoteMessage(stockCode);

    const dataStockQuote = {
      message,
      roomId: data.roomId,
    };

    redisUtil.getRedisClient().publish('message-stock-quote', JSON.stringify(dataStockQuote));
  }
};

const configSocket = async () => {
  const token = await apiUtil.requestTokenApi();

  const socket = io(webChatServerUrl, {
    auth: {
      token,
    },
  });

  socket.emit('joinRoom', { username: botName });
  socket.on('message', listenMessage);
};

module.exports = {
  configSocket,
};
