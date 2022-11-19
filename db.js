import mongoose from "mongoose";
import {url} from "./config.js";


export async function DBconnect(){
    try {
        const conexion = await mongoose.connect(url);
        //const conexion = mongoose.connection;
        //conexion.once('open', ()=>{
            console.log("DB Connected!" + conexion.connection.name);
       // });

    } catch (error) {
       //conexion.on('error', console.error.bind(console, "Error de conexion!")); 
       console.log("Connection error! ", error.message);
    }
}
