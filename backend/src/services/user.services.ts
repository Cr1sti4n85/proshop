import { IUserRepository, IUserService, User } from "../types/user.types";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: User): Promise<User> {
    return this.userRepository.create(data);
  }

  async findUsers(): Promise<User[]> {
    if (!this.userRepository.find) {
      throw new Error("Find method not implemented");
    }
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async updateUser(id: string, User: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, User);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
