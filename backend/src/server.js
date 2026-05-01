import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express";
import {inngest,functions} from "./lib/inngest.js"
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
const app = express();
const __dirname = path.resolve();

//Middlewares

app.use(express.json());

//credentials: true => broswer can send cookies to the server on request
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));

app.use("/api/inngest", serve({client:inngest, functions}))
app.use(clerkMiddleware());
app.use("/api/chat", chatRoutes);

//Routes
app.post("/api/webhooks/clerk",async (req,res)=>{
    const {type,data} = req.body;
    
    inngest.send({
      name: `clerk/${type}`,
      data: data
    });

    res.status(200).json({recieved: true})
});

app.get("/video-calls", protectRoute,(req,res)=>{
  res.status(200).json({
    message:"video call endpoint"
  });
});


app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is healthy",
  });
});

if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async function () {
  try {
    await connectDB();
    app.listen(ENV.PORT, async () => {
      console.log(`App is running on PORT ${ENV.PORT}`)});
  } 
  catch (error) {
    console.error("💥 Error starting servers");
  }
};

startServer();