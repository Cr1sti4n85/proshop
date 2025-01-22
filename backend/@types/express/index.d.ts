import { User } from "../../src/types/user.types";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
