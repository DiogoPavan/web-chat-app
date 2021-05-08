import * as http from 'http';

import HttpServer from './interfaces/http';
import env from './utils/env';
import { Container } from './utils/container';
import { ControllerContext } from './types/controller';

export class App {
  start(): void {
    const container = new Container();
    const app = this.createHttpServer(container.createContainer());
    const server = http.createServer(app);

    server.listen(env.httpPort);
  }

  private createHttpServer(container: ControllerContext) {
    const httpServer = new HttpServer(container);
    return httpServer.create();
  };
}

const app = new App();

setImmediate(() => {
  app.start();
  console.log('Web chat initialized');
});
