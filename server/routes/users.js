import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";
// Load input validation
const validateRegisterInput =
require("../../validation/register");
const validateLoginInput =
require("../../validation/login");
// Load User model
const User = require("../../models/User");