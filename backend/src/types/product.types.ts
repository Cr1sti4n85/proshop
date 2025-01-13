//user type: mongoose.Schea.Types.ObjectId,name, image, brand, category, description, reviews [reviewSchema]
//rating, numReviews, price, countInStock
import { Document } from "mongoose";
import { User } from "./user.types";
import { Review } from "./review.types";

export interface Product extends Document {
  user: User["_id"];
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviews: Review;
  numReviews: number;
  price: number;
  countInStock: number;
}
