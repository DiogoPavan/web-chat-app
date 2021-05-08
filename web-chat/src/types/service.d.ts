import { IMessageRepository, IMessageService } from './message';
import { IRoomRepository, IRoomService } from './rooms';
import { IUserRepository, IUserService } from './user';

export type ServiceContext = {
  userRepository: IUserRepository;
  messageRepository: IMessageRepository;
  roomRepository: IRoomRepository;
};

export type ServiceContainer = {
  userService: IUserService;
  messageService: IMessageService;
  roomService: IRoomService;
};
