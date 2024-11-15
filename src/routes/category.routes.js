import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/index.controller.js";

export const categoryRouter = Router();

categoryRouter.post("/category", createCategory);
categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.put("/category/:id", updateCategoryById);
categoryRouter.delete("/category/:id", deleteCategoryById);
