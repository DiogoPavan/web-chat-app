import express from 'express';
import cors from 'cors';
import path from 'path';

import { UserController } from './controllers/user';
import { HttpServerConfig, IController } from '../../types/interface';
import { RoomController } from './controllers/room';
import { errorHandler } from './middlewares/errorHandler';
import { validation } from './middlewares/validator';

export class HttpServer {
  private context: HttpServerConfig;

  constructor(context: HttpServerConfig) {
    this.context = context;
  }

  create(): express.Application {
    const app = express();

    app.use(
      cors(),
      express.json(),
    );

    this.setupStaticFrontend(app);

    this.setupRoutes(app);

    app.use(errorHandler);

    return app;
  }

  setupStaticFrontend(app: express.Application): void {
    const publicPath = path.join(__dirname, '..', '..', '..', 'public');

    app.use(express.static(publicPath));

    app.get('/signup', (req, res) => {
      res.sendFile(`${publicPath}/signup.html`);
    });

    app.get('/chat', (req, res) => {
      res.sendFile(`${publicPath}/chat.html`);
    });

    app.get('/lobby', (req, res) => {
      res.sendFile(`${publicPath}/lobby.html`);
    });
  }

  setupRoutes(app: express.Application): void {
    [
      new UserController({
        container: this.context.container,
        validator: validation,
      }),
      new RoomController({
        container: this.context.container,
        validator: validation,
      }),
    ]
      .forEach((route: IController) => {
        const router = express.Router({ mergeParams: true });
        route.register(router);
        app.use(router);
      });
  }
}
