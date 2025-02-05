import mongoose, { Document } from "mongoose";
import { User } from "./user.types";
import { Repository } from "./repository.types";

//user, name, rating, comments
export interface Review extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export type currentReview = Pick<
  Review,
  "user" | "name" | "rating" | "comment"
>;

// export interface IReviewRepository extends Repository<Review> {}

// export interface IProductService {
//   createProduct(data: Partial<Review>): Promise<Review>;
//   findReviews(): Promise<Review[]>;
//   findReviewById(id: string): Promise<Review | null>;
//   updateReview(id: string, review: Partial<Review>): Promise<Review | null>;
//   deleteReview(id: string): Promise<boolean>;
// }
