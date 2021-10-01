import React from "react";
import { minutesToDuration } from "../utils/duration";
import PropTypes from "prop-types";

const TimerSetting = ({
  label,
  session,
  timerState,
  setIncreaseDuration,
  setDecreaseDuration,
}) => {
  // Object containing the correct id's based on which timer the component changes
  const testIds = {
    durationType: `duration-${label.toLowerCase()}`,
    decreaseDuration: `decrease-${label.toLowerCase()}`,
    increaseDuration: `increase-${label.toLowerCase()}`,
  };

  // Returns the timer display based on label param
  const getTimer = label => {
    if (label === "Focus") {
      return minutesToDuration(timerState.focusDuration);
    }
    return minutesToDuration(timerState.breakDuration);
  };

  // Returns true if there is an active session
  const getSessionStatus = () => (session ? true : "");

  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={testIds.durationType}>
        {label} Duration: {getTimer(label)}
      </span>
      <div className="input-group-append">
        <button
          disabled={getSessionStatus()}
          type="button"
          className="btn btn-secondary"
          data-testid={testIds.decreaseDuration}
          onClick={setDecreaseDuration}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          disabled={getSessionStatus()}
          type="button"
          className="btn btn-secondary"
          data-testid={testIds.increaseDuration}
          onClick={setIncreaseDuration}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};

TimerSetting.propTypes = {
  label: PropTypes.string,
  session: PropTypes.object,
  timerState: PropTypes.object,
  setIncreaseDuration: PropTypes.func,
  setDecreaseDuration: PropTypes.func,
};

export default TimerSetting;
