import { Router } from "express";
import {
  addressesRouter,
  authRouter,
  categoryRouter,
  productRouter,
  profilesRouter,
  userRouter,
} from "./routes.js";

import { createTables } from "../database/tables/index.table.js";
import { logger } from "../utils/logger.utils.js";


export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/addresses", addressesRouter);
router.use("/profiles", profilesRouter);
router.use("/category", categoryRouter)
router.use("/product", productRouter)

router.post("/setup", async (req, res) => {
  try {
     createTables();
    res.status(200).send("Tables created successfully.");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error creating tables.");
  }
});
