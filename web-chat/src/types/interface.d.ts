import { Socket, Server } from 'socket.io';
import { Router } from 'express';
import * as http from 'http';

import { ServiceContainer } from './service';
import { Env } from './env';

export type ControllerContext = {
  container: ServiceContainer;
};

export interface IController {
  register(r: Router): void;
}

export type HttpServerConfig = {
  container: ServiceContainer;
};

export type SocketWebChat = Socket & {
  userId?: string;
  username?: string;
};

export type SocketContext = {
  socket: SocketWebChat;
  io: Server;
  container: ServiceContainer;
  botName: string;
};

export interface ISocket {
  listener(): void;
}

export type WebSocketServerConfig = {
  server: http.Server;
  container: ServiceContainer;
  env: Env;
};
