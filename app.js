import express from "express";
import cors from "cors";
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);

//CORS
/* var corsOptions = {
      origin: "https://erossiano.github.io/"
  }; */
//app.use(cors());
 // app.use(cors({ origin: true , credentials :  false}));
 const whitelist = ["https://erossiano.github.io", "http://localhost:3000", "https://erossiano.github.io/"];
 const corsOptions = {
   origin: function (origin, callback) {
     if (!origin || whitelist.indexOf(origin) !== -1) {
       callback(null, true)
     } else {
       callback(new Error("Not allowed by CORS"))
     }
   },
   credentials: true,
 }
 app.use(cors(corsOptions))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

export default app;