import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.services";
import { IUserRepository, IUserService, User } from "../types/user.types";
import asyncHandler from "../middleware/asyncHandler";
import { EnvConfiguration } from "../config/envConfig";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

// @desc  auth user / get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const user = await userService.findUserByEmail(email);

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id },
      EnvConfiguration().jwtSecret as string,
      {
        expiresIn: "30d",
      }
    );

    //Set jwt as http only cookie
    res.cookie(`jwt-${Date.now()}`, token, {
      httpOnly: true,
      secure: EnvConfiguration().NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(
  async (_req: Request, res: Response) => {
    res.status(200).json({ message: "register user" });
  }
);

// @desc  Log out user / clear cookie
// @route POST /api/users/logout
// @access Private
export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: "logout user" });
});

// @desc  Get user profile
// @route Get /api/users/profile
// @access Private
export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Get user profile" });
});

// @desc  Updte user profile
// @route PUT /api/users/profile
// @access Private
export const updateProfile = asyncHandler(
  async (_req: Request, res: Response) => {
    res.status(200).json({ message: "update user profile" });
  }
);

// @desc  Get users
// @route GET /api/users
// @access Private/admin
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Get users" });
});

// @desc  Delete user
// @route DELETE /api/users/:id
// @access Private/admin
export const deleteUser = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Delete user" });
});

// @desc  Get user by id
// @route GET /api/users/:id
// @access Private/admin
export const getUserById = asyncHandler(
  async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Get user by id" });
  }
);

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/admin
export const updateUser = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Update user" });
});
