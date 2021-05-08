import express from 'express';
import cors from 'cors';
import path from 'path';

import UserController from './controllers/user';
import { ControllerContext, IController } from '../../types/controller';
import { errorHandler } from './middlewares/errorHandler';

export default class HttpServer {
  private container: ControllerContext;

  constructor(container: ControllerContext) {
    this.container = container;
  }

  create(): express.Application {
    const app = express();

    const publicPath = path.join(__dirname, '..', '..', '..', 'public')

    app.use(express.static(publicPath));

    app.use(
      cors(),
      express.json(),
    );

    app.get('/signup', function(req, res) {
      res.sendFile(publicPath + '/signup.html');
    });

    this.setupRoutes(app);

    app.use(errorHandler);

    return app;
  };

  setupRoutes(app: express.Application) {
    [
      new UserController(this.container)
    ]
      .forEach((route: IController) => {
        const router = express.Router({ mergeParams: true });
        route.register(router);
        app.use(router);
      });
  }
}
