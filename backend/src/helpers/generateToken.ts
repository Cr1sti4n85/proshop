import { Response } from "express";
import jwt from "jsonwebtoken";
import { EnvConfiguration } from "../config/envConfig";

export const generateToken = (res: Response, id: string) => {
  const token = jwt.sign({ id }, EnvConfiguration().jwtSecret as string, {
    expiresIn: "30d",
  });

  //Set jwt as http only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: EnvConfiguration().NODE_ENV === "development" ? false : true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
