import { Server } from 'socket.io';

import { WebSocketServerConfig } from './../../types/interface';
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

    io.use(authorization);

    io.on('connection', socket => {
      const messageSocket = new MessageSocket({
        socket,
        io,
        container: this.container,
        botName: this.env.botName!,
      });

      messageSocket.listener();
    });
  }
}
