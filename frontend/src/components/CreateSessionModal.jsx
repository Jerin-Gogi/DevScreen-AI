import React from "react";
import { PROBLEMS } from "../data/problems";
import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>
        <div className="space-y-2">
          <label className="label">
            <span className="label-text font-semibold">Select Problem</span>
            <span className="label-text-alt text-error"></span>
          </label>
          <select
            className="select w-full"
            value={roomConfig.problem}
            onChange={(e) => {
              const selectedProblem = problems.find(
                (each) => each.title === e.target.value,
              );
              setRoomConfig({
                problem: e.target.value,
                difficulty: selectedProblem.difficulty,
              });
            }}
          >
            <option value="" disabled>
              Chosse a coding problem
            </option>
            {problems.map((each) => {
              return (
                <option key={each.id} value={each.title}>
                  {each.title} {each.difficulty}
                </option>
              );
            })}
          </select>
        </div>
        {roomConfig.problem && (
          <div className="alert alert-success mt-4">
            <Code2Icon className="size-5" />
            <div>
              <p className="font-semibold">Room Summary:</p>
              <p>
                Problem:{" "}
                <span className="font-medium">{roomConfig.problem}</span>
              </p>
              <p>
                Max Participants:{" "}
                <span className="font-medium">2 (1-on-1 session)</span>
              </p>
            </div>
          </div>
        )}
        <div className="modal-action ">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default CreateSessionModal;
