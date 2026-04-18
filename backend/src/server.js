import express from "express";
import { ENV } from "./lib/env.js";

const app = express();


app.use(express.json());
app.get("/health", (req,res)=>{
    res.status(200).json({
        message:"Server is healthy"
    });
});

app.listen(ENV.PORT,()=>{
    console.log(`App is running on PORT ${ENV.PORT}`);
});