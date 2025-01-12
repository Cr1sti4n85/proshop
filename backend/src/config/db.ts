import mongoose from "mongoose";
import { EnvConfiguration } from "../config/envConfig";

const mongoUri: string = EnvConfiguration().mongoUri as string;

//IIFE to connect to MongoDB
export default (async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
})();
