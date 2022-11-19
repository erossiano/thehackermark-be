import dotenv from "dotenv";
//require('dotenv').config()
dotenv.config({});
export const port = process.env.port || 3002;
export const url =  process.env.uri || "localhost:3001";