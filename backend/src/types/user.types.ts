import { Document } from "mongoose";

//name, email, password, isAdmin
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  //   comparePassword: (password: string) => Promise<boolean>;
}
