import { IMessageRepository, IMessageService } from './message';
import { IUserRepository, IUserService } from './user';

export type ServiceContext = {
  userRepository: IUserRepository;
  messageRepository: IMessageRepository;
};

export type ServiceContainer = {
  userService: IUserService;
  messageService: IMessageService;
};
