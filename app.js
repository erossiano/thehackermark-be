import express from "express";
import cors from "cors";
//var cors = require('cors');
//Rutas de componetes
import userRoutes from "./server/routes/users.routes.js";
import productRoutes from "./server/routes/products.routes.js";


var corsOptions = {
  origin: 'https://erossiano.github.io/thehackermark',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
// Add Access Control Allow Origin headers
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

//Ruta general


userRoutes.get("/", (req, res) => { 
  res.send("API funcionado!" + " - origin: " + cors.prototype());
});

export default app;