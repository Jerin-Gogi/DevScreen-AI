import { createCommandStringExtractionMiddleware } from "stream-chat";
import { client, streamClient } from "../lib/stream.js";
import  Session  from "../models/Session.js";

export const createSession = async function (req, res) {
  try {
    const { problem, difficulty } = req.body;
    const { _id: userId, clerkId } = req.user;

    if (!problem || !difficulty) {
      res.status(400).json({ message: "Problem and Difficulty are required" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const newSession = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //Video Call
    const call = streamClient.video.call("default", callId);

    await call.getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: newSession._id.toString() },
      },
    });

    //Chat Messaging
    const channel = client.channel("messaging", callId, {
      name: `${problem}_Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    return res.status(201).json({ newSession });
  } catch (err) {
    console.log(`[Error-in-createSession-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getActiveSessions = async function (req,res) {
//     try {
//         const {_id: userId} = req.user;
//         const activeSessions = await Session.find({host: userId, status:"active"});
//         if(activeSessions.length === 0){
//             res.status(404).json({message: "No active sessions found"});
//         }

//     } catch (err) {
//         console.log(`[Error-in-getActiveSessions-controller] ${err.message}`);
//     }

// };

export const getActiveSessions = async function (_, res) {
  try {
    const activeSessions = await Session.find({
      status: "active",
    })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ activeSessions });
  } catch (err) {
    console.log(`[Error-in-getActiveSessions-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecentSessions = async function (req, res) {
  try {
    const { _id: userId } = req.user;
    const recentSessions = await Session.find(
      { status: "completed" },
      { $or: [{ host: userId }, { participant: userId }] },
    )
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({ recentSessions });
  } catch (err) {
    console.log(`[Error-in-getRecentSessions-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async function (req, res) {
  try {
    const { id } = req.params;
    const sessionById = await Session.findById({ id })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");

    if (!sessionById)
      return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ sessionById });
  } catch (err) {
    console.log(`[Error-in-getSessionById-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinSession = async function (req, res) {
  try {
    const { id } = req.params;
    const { _id: userId, clerkId } = req.user;

    const session = await Session.findById({ id });
    if (!session) return res.status(409).json({ message: "Session not found" });

    if (session.participant)
      return res.status(400).json({ message: "Session is full" });
    if(session.status !== "active") return res.status(400).json({message: "Cannot join a completed session"});
    if (session.host.toString() === userId.toString()) return res.status(400).json({message:"Host cannot be the participant"});
    session.participant = userId;
    await session.save();
    const channel = client.channel("messaging", session.callId);
    channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (err) {
    console.log(`[Error-in-joinSession-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const endSession = async function (req, res) {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const session = Session.findById({ id })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");
    if (!session) return res.status(404).json({ message: "Session not found" });
    //The the user is  not the host then return unauthorized message
    if (session.host.toString() !== userId.toString())
      return res
        .status(403)
        .json({ message: "Only session host can end sessions" });
    if (session.active === "completed")
      return res.status(403).json({ message: "Session is already completed" });
    
    const call = await streamClient.video.call("default", session.callId).get();
    await call.delete({ hard: true });
    
    const channel = await client.channel("messaging", session.callId);
    await channel.delete();
    session.status = "completed";
    await  session.save();
    res.status(200).json({ message: "Session ended sucessfully" });
  } catch (err) {
    console.log(`[Error-in-endSession-controller] ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
