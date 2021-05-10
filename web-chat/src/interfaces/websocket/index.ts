import { Server } from 'socket.io';
import redis from 'redis';

import { WebSocketServerConfig } from '../../types/interface';
import authorization from './middlewares/authorization';
import { MessageSocket } from './sockets/message';

export class WebSocketServer {
  private server: WebSocketServerConfig['server'];
  private container: WebSocketServerConfig['container'];
  private env: WebSocketServerConfig['env'];

  constructor(config: WebSocketServerConfig) {
    this.server = config.server;
    this.container = config.container;
    this.env = config.env;
  }

  connect() {
    const io = new Server(this.server);
    let messageSocket;

    const redisClient = redis.createClient({
      host: this.env.redisHost,
      port: this.env.redisPort,
    });

    redisClient.subscribe('message-stock-quote');

    io.use(authorization);
    io.on('connection', (socket) => {
      messageSocket = new MessageSocket({
        socket,
        io,
        container: this.container,
        botName: this.env.botName!,
      });

      messageSocket.listener();
    });

    redisClient.on('message', async (channel, data) => {
      await messageSocket.redisSubscription(channel, data);
    });
  }
}
