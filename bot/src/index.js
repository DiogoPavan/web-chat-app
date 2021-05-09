require('dotenv').config();
const io = require('socket.io-client');
const api = require('./api');

const STOCK_PATTERN = /\/stock=([^\s]*)/;
const BOT_NAME = process.env.BOT_NAME;
const BOT_PASSWORD = process.env.BOT_PASSWORD;

const startBot = async () => {
  const token = await api.requestTokenApi({
    botname: BOT_NAME,
    botpassword: BOT_PASSWORD,
  });
  const socket = io(process.env.WEB_APP_SERVER, {
    auth: {
      token,
    }
  });

  socket.emit('joinRoom', { username: BOT_NAME });

  socket.on('message', async (data) => {
    if (data.message.match(STOCK_PATTERN)) {
      const [, stockCode] = data.message.split('=');

      const message = await api.requestStockQuote(stockCode);

      socket.emit('chatMessage', {
        message: message,
        roomId: data.roomId,
      });
    }
  });
}

startBot();