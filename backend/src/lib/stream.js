import { ENV } from "./env";
import {StreamChat} from "stream-chat";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_SECRET_KEY;

if(!apiKey || !apiSecret){
    console.log("Cannot find keys");
}

const client = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async function(userData){
    try {
        await client.upsertUser(userData);
        generateToken(userData.clerkId);
    } catch (err) {
        console.log(`[ERROR] ${err.message}`)
    }
}

export const deleteStreamUser = async function (userId) {
  try {
    await client.deleteUser(userId, {
      delete_conversation_channels: true,
      hard_delete: true,
      mark_messages_deleted: true,
    });
    console.log("User deleted sucessfully");
  } catch (error) {
    console.log(`[ERROR] ${err.message}`);
  }
};
// generate token
const generateToken = function(data){
    serverClient.createToken(data);
}