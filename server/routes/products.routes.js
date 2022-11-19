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
productRoutes.post("/api/product/", createProduct);
productRoutes.put("/product/:isbn", updateProduct);
productRoutes.delete("/api/product/:id", deleteProduct);

export default productRoutes;