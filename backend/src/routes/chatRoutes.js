import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import {generateStreamToken} from "../controllers/chatController.js"
export const chatRoutes = express.Router();

chatRoutes.get("/token", protectRoute, generateStreamToken)