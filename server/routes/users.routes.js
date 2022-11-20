import { Router } from "express";

import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
} from "../controllers/User.Controller.js"
const userRoutes = Router();

userRoutes.get("/api/users/", getAllUsers);
userRoutes.get("/api/users/:id", getUser);
userRoutes.post("/api/users/", createUser);
userRoutes.put("/api/users/:id", updateUser);

export default userRoutes;