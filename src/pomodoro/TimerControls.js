import React from "react";
import classNames from "../utils/class-names";
import TimerSetting from "./TimerSetting";

const TimerControls = ({
  session,
  timerState,
  decreaseFocusDuration,
  increaseFocusDuration,
  decreaseBreakDuration,
  increaseBreakDuration,
  playPause,
  isTimerRunning,
  resetTimers,
}) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <TimerSetting
            label={"Focus"}
            session={session}
            timerState={timerState}
            setIncreaseDuration={increaseFocusDuration}
            setDecreaseDuration={decreaseFocusDuration}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <TimerSetting
              label={"Break"}
              session={session}
              timerState={timerState}
              setIncreaseDuration={increaseBreakDuration}
              setDecreaseDuration={decreaseBreakDuration}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={resetTimers}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerControls;
