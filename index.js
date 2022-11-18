// Importar config Servidor
import {app, router} from "./server/server.js";
//Importar config de BD
import conexion from "./server/database.js";
// Passport config
import passp from "./server/config/passport.js";

//import "./routes/ProductsRoutes.js"
//Import User functions
import {
    registerUser,
    loginUser
} from "./server/schemas/Users.js";


//Import CRUD Products functions
import {
    getAllProducts, 
    getProduct, 
    updateProduct, 
    createProduct, 
    deleteProduct
} from "./server/schemas/Products.js";

//Route for root URL
app.get('/',
    (req, res)=>{
        res.json({ message: "Welcome to server." });
});


//Routes API for Products
router.get("/api/products/", getAllProducts);
router.get("/api/products/:isbn", getProduct);
router.post("/api/products/", createProduct);
router.put("/api/products/:isbn", updateProduct);
router.delete("/api/products/:isbn", deleteProduct);


//Routes API Users
router.post("/api/user/register", registerUser);
router.post("/api/user/register", loginUser);