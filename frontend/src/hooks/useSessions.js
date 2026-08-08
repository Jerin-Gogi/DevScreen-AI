import { useQuery, useMutation } from "@tanstack/react-query";
import { sessionApi } from "../api/sessions.js";
import toast from "react-hot-toast";

export const useActiveSessions = function () {
  const res = useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  });
  return res;
};

export const useCreateSessions = function () {
  const res = useMutation({
    mutationKey: ["createSessions"],
    mutationFn: (data) => sessionApi.createSession(data),
    onSuccess: () => toast.success("Session created sucessfully"),
    onError: (error) => toast.error(error.response.data.message),
  });
  return res;
};

export const useRecentSessions = function () {
  const res = useQuery({
    queryKey: ["recentSessions"],
    queryFn: () => sessionApi.getRecentSessions(),
  });
  return res;
};

export const useSessionById = function (id) {
  const res = useQuery({
    queryKey: ["sessionsById", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
  return res;
};
export const useJoinSession = function () {
  const res = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: () => sessionApi.joinSession,
    onSuccess: () => toast.success("Joined Session sucessfully"),
    onError: (error) => toast.error(error.response.data.message),
  });

  return res;
};

export const useEndSession = function () {
  const res = useMutation({
    mutationKey: ["endSession"],
    mutationFn: () => sessionApi.endSession,
    onSuccess: () => toast.success("Session ended sucessfully"),
    onError: (error) => toast.error(error.response.data.message),
  });

  return res;
};
