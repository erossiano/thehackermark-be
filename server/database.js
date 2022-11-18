
import mongoose from "mongoose";

const url = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1ifv0dg.mongodb.net/thehackermark";
const mg = mongoose.connect(url);
const conexion = mongoose.connection;
conexion.on('error', console.error.bind(console, "Error de conexion!"));
conexion.once('open', ()=>{
    console.log("DB Connected!");
});

export default conexion;