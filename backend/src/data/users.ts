import bcrypt from "bcrypt";
import { User } from "types/user.types";

const users: Pick<User, "name" | "email" | "password" | "isAdmin">[] = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
