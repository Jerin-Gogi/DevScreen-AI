import { axiosInstance } from "../lib/axios.js";

export const sessionApi = {
  createSession: async function (data) {
    const res = await axiosInstance.post("/session", data);
    return res.data;
  },
  getActiveSessions: async function () {
    const res = await axiosInstance.get("/session/active");
    return res.data;
  },
  getRecentSessions: async function () {
    const res = await axiosInstance.get("/session/my-recent-sessions");
    console.log(res);
    return res.data;
  },
  getSessionById: async function (id) {
    const res = await axiosInstance.get(`/session/${id}`);
    return res.data;
  },
  joinSession: async function (id) {
    const res = await axiosInstance.post(`/session/${id}/join`);
    return res.data;
  },
  endSession: async function (id) {
    const res = await axiosInstance.post(`/session/${id}/end`);
    return res.data;
  },
  getStreamToken: async function () {
    const res = await axiosInstance.post(`/chat/token`);
    return res.data;
  },
};
