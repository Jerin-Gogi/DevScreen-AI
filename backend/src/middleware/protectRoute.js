import {getAuth} from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async function(req,res,next){
    try {
                const auth = getAuth(req);
                const { userId: clerkId } = auth;
                console.log(clerkId);


        if (!clerkId)
          return res
            .status(404)
            .json({ message: "Unauthorized - Invalid Token" });

        const user = await User.findOne({ clerkId });

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        console.log("Error is protectMiddleware", err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}