import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/index.controller.js";
import { checkToken } from "../middlewares/checkTokens.middleware.js";

export const userRouter = Router();

userRouter.post("/user", checkToken, createUser);
userRouter.get("/users", checkToken, getAllUsers);
userRouter.get("/user/:id", checkToken, getUserById);
userRouter.put("/user/:id", checkToken, updateUserById);
userRouter.delete("/user/:id", checkToken, deleteUserById);
