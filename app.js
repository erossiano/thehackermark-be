import express from "express";
import cors from "cors";
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";
const app = express();
app.use(express.json());

//CORS
/*  var corsOptions = {
  origin: 'https://erossiano.github.io',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET,HEAD,PUT,PATCH,DELETE',
} */

app.use(cors());
var corsOptions = {
    origin: "https://erossiano.github.io" | "localhost:3000"
  };
app.use(cors(corsOptions));

//Routes
app.use(userRoutes);
app.use(productRoutes);

userRoutes.get("/", (req, res, next) => { 
  res.json({welcome : "Welcome to HackerMark API!"});
  next();
});

export default app;