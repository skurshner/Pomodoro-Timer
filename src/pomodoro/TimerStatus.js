import React from "react";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";
import StatusBar from "./StatusBar";

const TimerStatus = ({ timerState, session, isTimerRunning }) => {
  const focusDur = minutesToDuration(timerState.focusDuration);
  const breakDur = minutesToDuration(timerState.breakDuration);
  const sessionType = session?.label;

  if (!session) return <></>;

  return (
    <div>
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
          <h2 data-testid="session-title">
            {sessionType} for {sessionType === "Focusing" ? focusDur : breakDur}{" "}
            minutes
          </h2>
          {/* TODO: Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <h2>{session && !isTimerRunning ? "PAUSED" : ""}</h2>
        </div>
      </div>
      <StatusBar timerState={timerState} session={session} />
    </div>
  );
};

export default TimerStatus;
