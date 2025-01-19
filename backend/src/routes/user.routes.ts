import { Request, Response, Router } from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateProfile,
  updateUser,
} from "controllers/user.controller";

const router = Router();

router.route("/").get(getUsers).post(registerUser);

router.post("/logout", logoutUser);

router.post("/login", authUser);

router.route("/profile").get(getProfile).put(updateProfile);

router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
