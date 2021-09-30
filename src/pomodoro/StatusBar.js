import React from "react";

const StatusBar = ({ timerState, session }) => {
  const percentage = (timerState.focusDuration * 60) / session.timeRemaining;

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: { percentage } }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
