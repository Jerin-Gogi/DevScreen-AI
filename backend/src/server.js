import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";


const app = express();
const __dirname = path.resolve();

app.use(express.json());
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