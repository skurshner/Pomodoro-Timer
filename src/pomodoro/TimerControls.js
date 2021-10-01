import React from "react";
import PropTypes from "prop-types";
import StartStop from "./StartStop";
import TimerSetting from "./TimerSetting";

const TimerControls = ({
  session,
  timerState,
  increaseFocusDuration,
  decreaseFocusDuration,
  increaseBreakDuration,
  decreaseBreakDuration,
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
      <StartStop
        isTimerRunning={isTimerRunning}
        session={session}
        playPause={playPause}
        resetTimers={resetTimers}
      />
    </>
  );
};

TimerControls.propTypes = {
  session: PropTypes.object,
  timerState: PropTypes.object,
  increaseFocusDuration: PropTypes.func,
  decreaseFocusDuration: PropTypes.func,
  increaseBreakDuration: PropTypes.func,
  decreaseBreakDuration: PropTypes.func,
  playPause: PropTypes.func,
  isTimerRunning: PropTypes.bool,
  resetTimers: PropTypes.func,
};

export default TimerControls;
