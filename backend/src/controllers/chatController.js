import { generateToken } from "../lib/stream.js";

export const generateStreamToken = async function(req,res){
    try {
        //Using clerk id for stream not mongodb, because we use clerk id to while syncing users to stream dashboard
        const id  = req.user.clerkId;
        const token = generateToken(id);
        return res
          .status(200)
          .json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profileImage,
          });
    } catch (err) {
        console.log(`[Error-chat-controller]: ${err.message}`)
        return res.status(500).json({message: "Internal Server Error"});
    }
}