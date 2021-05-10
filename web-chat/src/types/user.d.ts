export type User = {
  id?: string,
  username: string,
  password?: string,
};

export interface IUserRepository {
  signUp(user: User): Promise<User>;
  findByUsername(username: User['username']): Promise<User>;
}

export interface IUserService {
  signUp(user: User): Promise<User>;
  signIn(user: User): Promise<string>;
  findByUsername(username: User['username']): Promise<User>;
}
