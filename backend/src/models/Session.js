import mongoose from "mongoose";

// Session Schema

const sessionSchema = mongoose.Schema({
  //problem, difficulty, host, participant, status

  problem: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  host: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participant: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
  },
  status:{
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },
  callId: {
    type: String,
    default: ""
  }
},{timestamps: true});

// Session Model

const Session = mongoose.model("Session",sessionSchema);

export default Session;