import React from "react";
import StartStop from "./StartStop";
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
      <StartStop
        isTimerRunning={isTimerRunning}
        session={session}
        playPause={playPause}
        resetTimers={resetTimers}
      />
    </>
  );
};

export default TimerControls;
