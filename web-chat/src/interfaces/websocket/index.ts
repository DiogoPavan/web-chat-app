import { Server } from 'socket.io';
import redis from 'redis';

import { WebSocketServerConfig } from '../../types/interface';
import authorization from './middlewares/authorization';
import { ChatSocket } from './sockets/chat';

export class WebSocketServer {
  private server: WebSocketServerConfig['server'];
  private container: WebSocketServerConfig['container'];
  private env: WebSocketServerConfig['env'];

  constructor(config: WebSocketServerConfig) {
    this.server = config.server;
    this.container = config.container;
    this.env = config.env;
  }

  connect(): void {
    const io = new Server(this.server);
    let chatSocket;

    const redisClient = redis.createClient({
      host: this.env.redisHost,
      port: this.env.redisPort,
    });

    redisClient.subscribe('message-stock-quote');

    io.use(authorization);
    io.on('connection', (socket) => {
      chatSocket = new ChatSocket({
        socket,
        io,
        container: this.container,
        botName: this.env.botName!,
      });

      chatSocket.listener();
    });

    redisClient.on('message', async (channel, data) => {
      await chatSocket.redisSubscription(channel, data);
    });
  }
}
