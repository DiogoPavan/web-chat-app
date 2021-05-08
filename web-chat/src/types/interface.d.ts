import { Socket, Server } from 'socket.io';
import { Router } from 'express';
import * as http from 'http';

import { ServiceContainer } from './service';

export type ControllerContext = {
  container: ServiceContainer;
};

export interface IController {
  register(r: Router): void;
}

export type HttpServerConfig = {
  container: ServiceContainer;
};

export type SocketContext = {
  socket: Socket;
  io: Server;
  container: ServiceContainer
}

export interface ISocket {
  listener(): void;
}

export type WebSocketServerConfig = {
  server: http.Server;
  container: ServiceContainer;
};
