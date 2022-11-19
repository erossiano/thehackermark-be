import { Router } from "express";

import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
} from "../controllers/User.Controller.js"
const userRoutes = Router();

userRoutes.get("/", (req, res) => { 
                        res.send("mensaje");
                    });

userRoutes.get("/user/", getAllUsers);
userRoutes.get("/user/:id", getUser);
userRoutes.post("/user/", createUser);
userRoutes.put("/user/:id", updateUser);

export default userRoutes;