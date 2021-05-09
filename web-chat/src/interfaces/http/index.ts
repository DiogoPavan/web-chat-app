import express from 'express';
import cors from 'cors';
import path from 'path';

import { UserController } from './controllers/user';
import { HttpServerConfig, IController } from '../../types/interface';
import { errorHandler } from './middlewares/errorHandler';
import { RoomController } from './controllers/room';

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
  };

  setupStaticFrontend(app: express.Application) {
    const publicPath = path.join(__dirname, '..', '..', '..', 'public')

    app.use(express.static(publicPath));

    app.get('/signup', (req, res) => {
      res.sendFile(publicPath + '/signup.html');
    });

    app.get('/chat', (req, res) => {
      res.sendFile(publicPath + '/chat.html');
    });

    app.get('/lobby', (req, res) => {
      res.sendFile(publicPath + '/lobby.html');
    });
  }

  setupRoutes(app: express.Application) {
    [
      new UserController(this.context),
      new RoomController(this.context),
    ]
      .forEach((route: IController) => {
        const router = express.Router({ mergeParams: true });
        route.register(router);
        app.use(router);
      });
  }
}
