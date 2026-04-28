import { ENV } from "./env.js";
import {StreamChat} from "stream-chat";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SCERET;

if(!apiKey || !apiSecret){
    console.log(apiKey, apiSecret);
    console.log("Cannot find keys");
}

const client = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async function(userData){
    console.log(userData);
    try {
        await client.upsertUser(userData);
        console.log("User created in stream sucessfully")
        generateToken(userData.id.toString());
    } catch (err) {
        console.log(`[ERROR-stream] ${err}`);
    }
}

export const deleteStreamUser = async function (userId) {
  try {
    await client.deleteUser(userId.toString(), {
      delete_conversation_channels: true,
      hard_delete: true,
      mark_messages_deleted: true,
    });
    console.log("User deleted from stream sucessfully");
  } catch (err) {
    console.log(`[ERROR-stream] ${err}`);
  }
};
// generate token
const generateToken = function(data){
    client.createToken(data);
}