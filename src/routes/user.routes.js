import { Router } from "express";

export const userRouter = Router()

userRouter.post("/user")
userRouter.get("/users")
userRouter.get("/user/:id")
userRouter.put("/user/:id")
userRouter.delete("/user/:id")
