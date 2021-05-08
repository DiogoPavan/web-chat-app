import bcrypt from 'bcrypt';

import { ServiceContext } from '../types/service';
import { IUserService, User, IUserRepository } from '../types/user';

export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: ServiceContext) {
    this.userRepository = userRepository
  }

  async signUp(user: User): Promise<User> {
    const { username, password } = user;
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new Error('An user with this username already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return this.userRepository.signUp({
      username,
      password: hashPassword,
    })
  }
}
