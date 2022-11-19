import { Router } from "express";

import {
    getAllProducts,
    getProductByIsbn,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/Product.Controller.js"

const productRoutes = Router();

productRoutes.get("/api/products/", getAllProducts);
productRoutes.get("/api/products/:isbn", getProductByIsbn);
productRoutes.post("/api/products/", createProduct);
productRoutes.put("/products/:isbn", updateProduct);
productRoutes.delete("/api/products/:id", deleteProduct);

export default productRoutes;