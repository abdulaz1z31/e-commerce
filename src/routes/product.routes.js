import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/index.controller.js";

export const productRouter = Router();

productRouter.post("/product", createProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getProductById);
productRouter.put("/product/:id", updateProductById);
productRouter.delete("/product/:id", deleteProductById);
