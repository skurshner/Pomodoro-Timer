import React from "react";
import { minutesToDuration } from "../utils/duration";

const TimerSetting = ({
  label,
  session,
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

  const testIds = {
    durationType: `duration-${label.toLowerCase()}`,
    decreaseDuration: `decrease-${label.toLowerCase()}`,
    increaseDuration: `increase-${label.toLowerCase()}`,
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={testIds.durationType}>
        {/* TODO: Update this text to display the current focus session duration */}
        {label} Duration: {minutesToDuration(getTimer(label))}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          disabled={session ? true : ""}
          type="button"
          className="btn btn-secondary"
          data-testid={testIds.decreaseDuration}
          onClick={setDecreaseDuration}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          disabled={session ? true : ""}
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

export default TimerSetting;
