import { Server } from 'socket.io';

import { WebSocketServerConfig } from './../../types/interface';
import { MessageSocket } from './sockets/message';

export class WebSocketServer {
  private server: WebSocketServerConfig['server'];
  private container: WebSocketServerConfig['container'];

  constructor(config: WebSocketServerConfig) {
    this.server = config.server;
    this.container = config.container;
  }

  connect() {
    const io = new Server(this.server);

    io.on('connection', socket => {
      const messageSocket = new MessageSocket({
        socket,
        io,
        container: this.container,
      });

      messageSocket.listener();
    });
  }
}
