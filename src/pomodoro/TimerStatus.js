import React from "react";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";
import PropTypes from "prop-types";
import StatusBar from "./StatusBar";

const TimerStatus = ({ timerState, session, isTimerRunning }) => {
  // Convert `focus` and `break` duration lengths to correct display
  const focusDur = minutesToDuration(timerState.focusDuration);
  const breakDur = minutesToDuration(timerState.breakDuration);

  // Get label for session if there is one
  const sessionType = session?.label;

  // Convert session time remaining to correct display if there is one
  const sessionTimeRemaining = secondsToDuration(session?.timeRemaining);

  // Get the current timer length based the session type
  const getSessionDuration = () =>
    sessionType === "Focusing" ? focusDur : breakDur;

  // Return "PAUSED" if there is a current session, but the timer isn't running
  const getIsPaused = () => (session && !isTimerRunning ? "PAUSED" : "");

  // If there's no current session, return empty fragment
  if (!session) return <></>;

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {sessionType} for {getSessionDuration()} minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {sessionTimeRemaining} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <h2>{getIsPaused()}</h2>
        </div>
      </div>
      <StatusBar timerState={timerState} session={session} />
    </div>
  );
};

TimerStatus.propTypes = {
  timerState: PropTypes.object,
  session: PropTypes.object,
  isTimerRunning: PropTypes.bool,
};

export default TimerStatus;
