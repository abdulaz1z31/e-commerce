import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/index.controller.js";

export const userRouter = Router();

userRouter.post("/user", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUserById);
userRouter.delete("/user/:id", deleteUserById);
