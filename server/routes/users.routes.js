import { Router } from "express";

import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    getUserByEmail,
} from "../controllers/User.Controller.js"
const userRoutes = Router();

userRoutes.get("/api/users/", getAllUsers);
userRoutes.get("/api/users/:id", getUser);
userRoutes.get("/api/users/email/:email", getUserByEmail);
userRoutes.post("/api/users/", createUser);
userRoutes.put("/api/users/:id", updateUser);

export default userRoutes;