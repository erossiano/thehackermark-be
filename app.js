import express from "express";
import cors from "cors";
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);

//CORS
app.use(cors());
var corsOptions = {
    origin: ["localhost:3000","localhost:3000/thehackermark","https://erossiano.github.io","https://erossiano.github.io/thehackermark"]
  };
app.use(cors(corsOptions));
  


export default app;