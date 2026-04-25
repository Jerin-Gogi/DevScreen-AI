import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async function(){
    try{
        if(!ENV.DB_URL){
            throw new Error("No DB_URL found");
        }
        const connector= await mongoose.connect(ENV.DB_URL);
        console.log("✅ Sucessfully Connected to MongoDB",connector.connection.host );
    }
    catch (err){
        console.log(` ❌ Something went wrong while connecting to MongoDB. [Error] ${err.message}`);
        process.exit(1);
    }
}