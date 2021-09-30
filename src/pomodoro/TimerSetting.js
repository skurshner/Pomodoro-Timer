import React from "react";
import { minutesToDuration } from "../utils/duration";

const TimerSetting = ({
  label,
  timerState,
  setIncreaseDuration,
  setDecreaseDuration,
}) => {
  const getTimer = label => {
    if (label === "Focus") {
      return timerState.focusDuration;
    }
    return timerState.breakDuration;
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {/* TODO: Update this text to display the current focus session duration */}
        {label} Duration: {minutesToDuration(getTimer(label))}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={setDecreaseDuration}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={setIncreaseDuration}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};

export default TimerSetting;
