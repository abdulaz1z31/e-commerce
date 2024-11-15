import { Router } from "express";
import {
  createProfile,
  deleteProfileById,
  getAllProfiles,
  getProfileById,
  updateProfileById,
} from "../controllers/index.controller.js";

export const profilesRouter = Router();

profilesRouter.post("/profile", createProfile);
profilesRouter.get("/profiles", getAllProfiles);
profilesRouter.get("/profile/:id", getProfileById);
profilesRouter.put("/profile/:id", updateProfileById);
profilesRouter.delete("/profile/:id", deleteProfileById);
