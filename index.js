
import {DBconnect} from "./db.js";
import {port} from "./config.js";
import app from "./app.js";

DBconnect();

app.listen(port, (req, res) => {
   console.log(req.header('Origin'));
});



