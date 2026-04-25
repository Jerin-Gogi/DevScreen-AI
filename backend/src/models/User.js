import mongoose from "mongoose";

// 1. Define Schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    clerkId: {
        type:String,
        required: true,
        unique: true
    }
  },
  { timestamps: true }, // createdAt, updatedAt (for webhooks)
);

// 2. Create a model

const User = mongoose.model("User", userSchema);
export default User;