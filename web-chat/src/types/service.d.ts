import { IUserRepository, IUserService } from './user';

export type ServiceContext = {
  userRepository: IUserRepository;
};

export type ServiceContainer = {
  userService: IUserService;
};
