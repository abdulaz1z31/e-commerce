import { Router } from "express";
import {
  addressesRouter,
  authRouter,
  profilesRouter,
  userRouter,
} from "./routes.js";

import { createTables } from "../database/tables/index.table.js";
import { logger } from "../utils/logger.utils.js";

export const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/addresses", addressesRouter);
router.use("/profiles", profilesRouter);

router.post("/setup", async (req, res) => {
  try {
    await createTables();
    res.status(200).send("Tables created successfully.");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error creating tables.");
  }
});
