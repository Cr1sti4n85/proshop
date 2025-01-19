import { IUserRepository, IUserService, User } from "../types/user.types";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: User): Promise<User> {
    return this.userRepository.create(data);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, User: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, User);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
