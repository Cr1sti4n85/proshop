import mongoose, { Schema } from "mongoose";
import { User } from "../types/user.types";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (
  enteredPass: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPass, this.password);
};

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
