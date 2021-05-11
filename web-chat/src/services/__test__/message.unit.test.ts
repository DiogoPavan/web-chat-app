import { Chance } from 'chance';
import { ServiceContext } from '../../types/service';

import { MessageService } from '../message';

describe('MessageService', () => {
  const chance = new Chance();

  describe('findByRoomId', () => {
    it('should find messages by roomId with success', async () => {
      const roomId = chance.guid({ version: 4 });
      const messages = [{
        id: chance.guid(),
        message: chance.string(),
      }, {
        id: chance.guid(),
        message: chance.string(),
      }];

      const serviceContext = {
        messageRepository: {
          createMessage: jest.fn(),
          findByRoomId: jest.fn().mockResolvedValue(messages),
        },
      } as unknown as ServiceContext;

      const messageService = new MessageService(serviceContext);

      const result = await messageService.findByRoomId(roomId);

      expect(result).toEqual(messages.reverse());
      expect(serviceContext.messageRepository.findByRoomId).toBeCalledWith(roomId);
    });
  });

  describe('createMessage', () => {
    it('should create a message with success', async () => {
      const message = {
        message: chance.string(),
        userId: chance.guid({ version: 4 }),
        roomId: chance.guid({ version: 4 }),
      };
      const serviceContext = {
        messageRepository: {
          createMessage: jest.fn().mockResolvedValue({
            ...message,
          }),
          findByRoomId: jest.fn(),
        },
      } as unknown as ServiceContext;

      const messageService = new MessageService(serviceContext);

      const result = await messageService.createMessage(message);

      expect(result).toEqual(
        expect.objectContaining({
          ...message,
        }),
      );
      expect(serviceContext.messageRepository.createMessage).toBeCalledWith(message);
    });

    it('should not create a message when it is a stock command', async () => {
      const message = {
        message: '/stock=aapl.us',
        userId: chance.guid({ version: 4 }),
        roomId: chance.guid({ version: 4 }),
      };
      const serviceContext = {
        messageRepository: {
          createMessage: jest.fn(),
          findByRoomId: jest.fn(),
        },
      } as unknown as ServiceContext;

      const messageService = new MessageService(serviceContext);

      const result = await messageService.createMessage(message);

      expect(result).toEqual(
        expect.objectContaining({
          ...message,
        }),
      );
      expect(serviceContext.messageRepository.createMessage)
        .not
        .toBeCalled();
    });
  });
});
