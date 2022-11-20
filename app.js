import express from "express";
import cors from "cors";
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);

//CORS
var corsOptions = {
      origin: "https://erossiano.github.io"
  };
//app.use(cors());  
app.use(cors(corsOptions));
  


export default app;