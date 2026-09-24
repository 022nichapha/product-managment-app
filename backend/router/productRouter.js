import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getallProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getallProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
