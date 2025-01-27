import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.services";
import { IUserRepository, IUserService, User } from "../types/user.types";
import { EnvConfiguration } from "../config/envConfig";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const jwtSecret = EnvConfiguration().jwtSecret as string;

    //Read the jwt from the cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret) as User;

        const getUser = await userService.findUserById(decoded.id);

        if (!getUser) {
          res.status(404);
          throw new Error("User not found");
        }
        req.currentUser = getUser;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, Invalid or failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser && req.currentUser.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
