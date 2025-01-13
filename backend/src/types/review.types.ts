import { Document } from "mongoose";
import { User } from "./user.types";

//user, name, rating, comments
export interface Review extends Document {
  user: User["_id"];
  name: string;
  rating: number;
  comment: string;
}
