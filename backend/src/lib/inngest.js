import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import pkg from "@stream-io/video-client";
import { ENV } from "./env.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";
import User from "../models/User.js"
const { StreamVideoClient} = pkg;


export const inngest = new Inngest({ id: "devscreen-ai" });

const saveUserToDb = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    try {
      await connectDB();

      //MongoDb
      const { first_name, last_name, email_addresses, image_url, id } =
        event.data;
      const name = `${first_name || ""} ${last_name || ""}`;
      const newUser = await User.create({
        name: name,
        email: email_addresses[0]?.email_address,
        profileImage: image_url,
        clerkId: id,
      });

      //Stream
      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage
      });
      console.log("User synced sucessfully");
    } catch (err) {
      console.log(err.message);
    }
  },
);

const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;
      await deleteStreamUser(id.toString());
      await User.deleteOne({ clerkId: id });
      console.log("User Deleted Sucessfully");
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const functions = [saveUserToDb, deleteUserFromDb];
