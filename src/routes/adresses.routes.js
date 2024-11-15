import { Router } from "express";
import {
  createAddress,
  deleteAddressById,
  getAddressById,
  getAllAddresses,
  updateAddressById,
} from "../controllers/index.controller.js";

export const addressesRouter = Router();

addressesRouter.post("/address", createAddress);
addressesRouter.get("/addresses", getAllAddresses);
addressesRouter.get("/address/:id", getAddressById);
addressesRouter.put("/address/:id", updateAddressById);
addressesRouter.delete("/address/:id", deleteAddressById);
