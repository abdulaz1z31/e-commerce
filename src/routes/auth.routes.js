import { Router } from "express";
import { loginUser, registerUser, userProfile } from "../controllers/index.controller.js";
import { userSchema , loginSchema} from "../database/schema/index.schema.js";
import { validationMiddleware } from "../middlewares/index.middleware.js";
import { checkToken } from "../middlewares/checkTokens.middleware.js";
export const authRouter = Router();

authRouter.post("/register", validationMiddleware(userSchema), registerUser);
authRouter.post("/login", validationMiddleware(loginSchema), loginUser);
authRouter.get("/me", checkToken, userProfile)