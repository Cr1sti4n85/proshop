import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.services";
import { IUserRepository, IUserService, User } from "../types/user.types";
import asyncHandler from "../middleware/asyncHandler";
import { generateToken } from "../helpers/generateToken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

// @desc  auth user / get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const user = await userService.findUserByEmail(email);

  if (user && (await user.matchPassword(password)) && user._id) {
    generateToken(res, user._id.toString());

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
    const { name, email, password } = req.body;

    const userExists = await userService.findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await userService.createUser({ name, email, password });
    if (user && user._id) {
      generateToken(res, user._id.toString());

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc  Log out user / clear cookie
// @route POST /api/users/
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
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = req.currentUser?._id;
  const user = await userService.findUserById(id.toString());

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Updte user profile
// @route PUT /api/users/profile
// @access Private
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.currentUser?._id.toString();
    const user = await userService.findUserById(id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await userService.updateUser(id, user);
      if (updatedUser) {
        res.status(200).json({
          _id: updatedUser?._id,
          name: updatedUser?.name,
          email: updatedUser?.email,
          isAdmin: updatedUser?.isAdmin,
        });
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// @desc  Get users
// @route GET /api/users
// @access Private/admin
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.findUsers();
  res.status(200).json(users);
});

// @desc  Get user by id
// @route GET /api/users/:id
// @access Private/admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json(user);
});

// @desc  Delete user
// @route DELETE /api/users/:id
// @access Private/admin
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin user");
  }
  await userService.deleteUser(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, isAdmin } = req.body;
  const updatedUser = await userService.updateUser(req.params.id, {
    name,
    email,
    isAdmin,
  });

  if (!updatedUser) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});
