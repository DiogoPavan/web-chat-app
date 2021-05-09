import { WebSocketServerConfig } from './types/interface.d';
import * as http from 'http';

import { HttpServer } from './interfaces/http';
import env from './utils/env';
import { Container } from './utils/container';
import { HttpServerConfig } from './types/interface';
import { WebSocketServer } from './interfaces/websocket';

export class App {
  start(): void {
    const container = new Container().createContainer();
    const app = this.createHttpServer({
      container,
    });
    const server = http.createServer(app);

    this.connectWebsocket({ server, container, env });

    server.listen(env.appPort);
  }

  private createHttpServer(config: HttpServerConfig) {
    const httpServer = new HttpServer(config);
    return httpServer.create();
  };

  private connectWebsocket(config: WebSocketServerConfig) {
    const websocketServer = new WebSocketServer(config);
    websocketServer.connect();
  }
}

const app = new App();

setImmediate(() => {
  app.start();
  console.log('Web chat initialized');
});
