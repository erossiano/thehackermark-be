import dotenv from "dotenv";
//require('dotenv').config()



//dotenv.config({});
//port = "3001";
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1ifv0dg.mongodb.net/thehackermark";

//export const port = process.env.port || 3002;
//export const url =  process.env.uri || "localhost:3001";
export const port = 3001 || 3002;
export const url =  uri || "localhost:3001";