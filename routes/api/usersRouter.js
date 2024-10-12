import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/logout", authenticateToken, logoutUser);

router.get("/current", authenticateToken, getCurrentUsers);

router.patch("/", authenticateToken, updateUserSubscription);

export { router };
