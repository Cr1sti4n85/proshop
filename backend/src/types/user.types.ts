import { Document } from "mongoose";
import { Repository } from "./repository.types";

//name, email, password, isAdmin
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  //   comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserRepository extends Repository<User> {}

export interface IUserService {
  createUser(data: User): Promise<User>;
  findUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  updateUser(id: string, product: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
