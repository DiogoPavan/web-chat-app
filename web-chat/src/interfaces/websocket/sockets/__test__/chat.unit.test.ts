import { Chance } from 'chance';

import { ChatSocket } from '../chat';
import { SocketContext } from '../../../../types/interface';

describe('ChatSocket', () => {
  const chance = new Chance();

  describe('listener', () => {
    it('should call listener and add listeners', () => {
      const container = {
        userService: {},
        messageService: {},
        roomService: {},
      };
      const ctx = {
        socket: {
          on: jest.fn(),
        },
        io: jest.fn(),
        container,
        botName: 'Bot',
      } as unknown as SocketContext;
      const chatSocket = new ChatSocket(ctx);

      chatSocket.listener();

      expect(ctx.socket.on).toHaveBeenCalledTimes(2);
    });
  });

  describe('joinRoom', () => {
    it('should call joinRoom and emit messages to room', async () => {
      const messages = [{
        id: chance.guid(),
        message: chance.string(),
      }, {
        id: chance.guid(),
        message: chance.string(),
      }];
      const roomId = chance.guid({ version: 4 });
      const container = {
        userService: {},
        messageService: {
          findByRoomId: jest.fn().mockResolvedValue(messages),
        },
        roomService: {},
      };
      const ctx = {
        socket: {
          username: chance.string(),
          on: jest.fn(),
          join: jest.fn(),
          emit: jest.fn(),
        },
        io: {},
        container,
        botName: 'Bot',
      } as unknown as SocketContext;

      const chatSocket = new ChatSocket(ctx);

      await chatSocket.joinRoom({ roomId });

      expect(ctx.socket.join).toHaveBeenCalledWith(roomId);
      expect(ctx.socket.emit).toHaveBeenCalledWith('messages-join-room', messages);
      expect(ctx.container.messageService.findByRoomId).toHaveBeenCalledWith(roomId);
    });

    it('should call joinRoom and connect the bot in the rooms', async () => {
      const rooms = [{
        id: chance.guid(),
        name: chance.string(),
      }, {
        id: chance.guid(),
        name: chance.string(),
      }];
      const roomId = chance.guid({ version: 4 });
      const container = {
        userService: {},
        messageService: {},
        roomService: {
          findAll: jest.fn().mockResolvedValue(rooms),
        },
      };
      const ctx = {
        socket: {
          username: 'Bot',
          on: jest.fn(),
          join: jest.fn(),
          emit: jest.fn(),
        },
        io: {},
        container,
        botName: 'Bot',
      } as unknown as SocketContext;

      const chatSocket = new ChatSocket(ctx);

      await chatSocket.joinRoom({ roomId });

      expect(ctx.container.roomService.findAll).toHaveBeenCalled();
      rooms.forEach((room) => {
        expect(ctx.socket.join).toHaveBeenCalledWith(room.id);
      });
    });
  });

  describe('createMessage', () => {
    it('should create a message with success and emit it', async () => {
      const message = {
        message: chance.string(),
        createdAt: chance.date({ string: true }),
      };
      const roomId = chance.guid({ version: 4 });
      const container = {
        userService: {},
        messageService: {
          createMessage: jest.fn().mockResolvedValue(message),
        },
        roomService: {},
      };

      const fakeEmit = {
        emit: jest.fn(),
      };

      const ctx = {
        socket: {
          username: chance.string(),
          userId: chance.guid({ version: 4 }),
        },
        io: {
          to: jest.fn(() => fakeEmit),
        },
        container,
        botName: 'Bot',
      } as unknown as SocketContext;

      const chatSocket = new ChatSocket(ctx);

      await chatSocket.createMessage({
        message: message.message,
        roomId,
      });

      expect(fakeEmit.emit).toHaveBeenCalledWith('message', {
        message: message.message,
        username: ctx.socket.username,
        roomId,
        createdAt: message.createdAt,
      });
      expect(ctx.container.messageService.createMessage).toHaveBeenCalledWith({
        message: message.message,
        userId: ctx.socket.userId,
        roomId,
      });
    });
  });

  describe('redisSubscription', () => {
    it('should create a message with success and emit it', async () => {
      const data = {
        message: chance.string(),
        roomId: chance.guid({ version: 4 }),
      };
      const message = {
        message: data.message,
        createdAt: chance.date({ string: true }),
      };
      const user = {
        id: chance.guid({ version: 4 }),
        username: chance.string(),
      };
      const container = {
        userService: {
          findByUsername: jest.fn().mockResolvedValue(user),
        },
        messageService: {
          createMessage: jest.fn().mockResolvedValue(message),
        },
        roomService: {},
      };

      const fakeEmit = {
        emit: jest.fn(),
      };

      const ctx = {
        socket: {},
        io: {
          to: jest.fn(() => fakeEmit),
        },
        container,
        botName: 'Bot',
      } as unknown as SocketContext;

      const chatSocket = new ChatSocket(ctx);

      await chatSocket.redisSubscription(
        'channel',
        JSON.stringify(data),
      );

      expect(ctx.container.messageService.createMessage).toHaveBeenCalledWith({
        message: data.message,
        userId: user.id,
        roomId: data.roomId,
      });
      expect(fakeEmit.emit).toHaveBeenCalledWith('message', {
        message: message.message,
        username: user.username,
        roomId: data.roomId,
        createdAt: message.createdAt,
      });
    });
  });
});
