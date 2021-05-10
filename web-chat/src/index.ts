import * as http from 'http';

import env from './utils/env';
import { WebSocketServerConfig, HttpServerConfig } from './types/interface';
import { HttpServer } from './interfaces/http';
import { createContainer } from './utils/container';
import { WebSocketServer } from './interfaces/websocket';

export class App {
  start(): void {
    const container = createContainer();
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
  }

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
