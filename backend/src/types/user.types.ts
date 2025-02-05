import mongoose, { Document } from "mongoose";
import { Query, Repository } from "./repository.types";

//name, email, password, isAdmin
export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  matchPassword: (password: string) => Promise<boolean>;
}

export type registeredUser = Pick<User, "name" | "email" | "password">;

export interface IUserRepository extends Repository<User> {
  findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
  createUser(data: registeredUser): Promise<User>;
  findUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, product: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
