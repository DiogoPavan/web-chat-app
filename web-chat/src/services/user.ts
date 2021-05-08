import bcrypt from 'bcrypt';

import { ServiceContext } from '../types/service';
import { IUserService, User, IUserRepository } from '../types/user';

export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: ServiceContext) {
    this.userRepository = userRepository
  }

  async singUp(user: User): Promise<User> {
    const { name, password } = user;
    const existingUser = await this.userRepository.findByName(name);

    if (existingUser) {
      throw new Error('An user with this username already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return this.userRepository.singUp({
      name,
      password: hashPassword,
    })
  }
}
