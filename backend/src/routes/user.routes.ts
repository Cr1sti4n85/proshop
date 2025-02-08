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
} from "../controllers/user.controller";
import { protect, admin } from "../middleware/auth.middleware";

const router = Router();

router.route("/").get(protect, admin, getUsers).post(registerUser);

router.post("/logout", logoutUser);

router.post("/auth", authUser);

router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

router.use(protect, admin);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
