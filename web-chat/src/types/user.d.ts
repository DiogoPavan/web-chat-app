export type User = {
  id?: string,
  name: string,
  password?: string,
};

export interface IUserRepository {
  singUp(user: User): Promise<User>;
  findByName(name: string): Promise<User>;
}

export interface IUserService {
  singUp(user: User): Promise<User>;
}
