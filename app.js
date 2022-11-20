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
      origin: "https://erossiano.github.io/"
  };
//app.use(cors());
 // app.use(cors({ origin: true , credentials :  false}));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

export default app;