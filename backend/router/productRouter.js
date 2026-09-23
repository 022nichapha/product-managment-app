import { Router } from "express";
import {
  createProduct,
  getallProduct,
  getProductById,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getallProduct);
productRouter.get("/", getProductById);

export default productRouter;
