import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/react";
import {
  useActiveSessions,
  useCreateSessions,
  useRecentSessions,
} from "../hooks/useSessions";
import { useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import CreateSessionModal from "../components/CreateSessionModal";
import RecentSessions from "../components/RecentSessions";
import ActiveSessions from "../components/ActiveSessions";
import StatsCards from "../components/StatsCards";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useRecentSessions();

  const createSessionMutation = useCreateSessions();

  const handleCreateRoom = function () {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    console.log(roomConfig.problem, roomConfig.difficulty);
    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowModal(false);
          navigate(`/session/${data.newSession._id}`);
        },
      },
    );
  };

  const activeSessions = activeSessionsData?.activeSessions || [];
  const recentSessions = recentSessionsData?.recentSessions || [];
  console.log(recentSessionsData);

  const isUserInSession = function (session) {
    if (!user.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowModal(true)} />

        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>
          <RecentSessions
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
          />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;
