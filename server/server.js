import express from "express";
import cors from "cors";


var router = express.Router();

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(cors());
var corsOptions = {
    origin: "https://erossiano.github.io"
  };
app.use(cors(corsOptions));
  
app.use(router);

const port = 3001;

app.listen(port, () =>{
    console.log("Server started at: " + port);
});

export {
    app, router
}