import express from "express";
import session from 'express-session';
import path from 'path';
import cors from "cors";
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
  cookie: { secure: true }
}));


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


const __dirname = "/";
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

//Routes
app.use(userRoutes);
app.use(productRoutes);


userRoutes.get("/", (req, res, next) => { 
  res.json({welcome : "Welcome to HackerMark API!"});
  next();
});

export default app;