import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import jwtConfig from '../utils/jwt';
import { ServiceContext } from '../types/service';
import { IUserService, User } from '../types/user';

export class UserService implements IUserService {
  private userRepository: ServiceContext['userRepository'];

  constructor({ userRepository }: ServiceContext) {
    this.userRepository = userRepository;
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
    });
  }

  async signIn({ username, password }: User): Promise<string> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    if (!(await bcrypt.compare(password, existingUser.password!))) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({
      id: existingUser.id,
      username: existingUser.username,
    }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return token;
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }
}
