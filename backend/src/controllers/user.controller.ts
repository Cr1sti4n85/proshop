import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.services";
import { IUserRepository, IUserService, User } from "../types/user.types";
import asyncHandler from "../middleware/asyncHandler";
import { generateToken } from "helpers/generateToken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

// @desc  auth user / get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const user = await userService.findUserByEmail(email);

  if (user && (await user.matchPassword(password)) && user._id) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const userExists = await userService.findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    try {
      const user = await userService.createUser(req.body);
      if (user && user._id) {
        generateToken(res, user._id);

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }

    //  else {
    //   console.log(req.body);
    //   res.status(400);
    //   throw new Error("Invalid user data");
    // }
  }
);

// @desc  Log out user / clear cookie
// @route POST /api/users/logout
// @access Private
export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
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
