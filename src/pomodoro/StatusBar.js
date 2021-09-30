import React from "react";

const StatusBar = ({ timerState, session }) => {
  const focDuration = timerState.focusDuration * 60;
  const brkDuration = timerState.breakDuration * 60;

  const getPercentageLeft = () => {
    if (session.label === "Focusing") {
      return 100 * ((focDuration - session.timeRemaining) / focDuration);
    } else if (session.label === "On Break") {
      return 100 * ((brkDuration - session.timeRemaining) / brkDuration);
    }
  };

  return (
    <div className="row mb-2">
      <div className="col">
        <p>{getPercentageLeft()}</p>
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={getPercentageLeft()} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: getPercentageLeft() + "%" }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
