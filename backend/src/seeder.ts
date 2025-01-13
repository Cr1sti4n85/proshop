import mongoose from "mongoose";
import users from "./data/users";
import products from "./data/products";
import UserModel from "models/user.model";
import ProductModel from "./models/product.model";
import Order from "./models/order.model";
import "./config/db";
import { User } from "types/user.types";

const importData = async () => {
  try {
    await Order.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers: User[] = await UserModel.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
