import React from "react";
import PropTypes from "prop-types";

const StatusBar = ({ timerState, session }) => {
  // Convert focus and break duration to seconds
  const focDuration = timerState.focusDuration * 60;
  const brkDuration = timerState.breakDuration * 60;

  // Return the time % remaining in a given session
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
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={getPercentageLeft()}
            style={{ width: getPercentageLeft() + "%" }}
          />
        </div>
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  session: PropTypes.object,
  timerState: PropTypes.object,
};

export default StatusBar;
