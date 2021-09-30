import React, { useState } from "react";
import useInterval from "../utils/useInterval";
// import TimerControls from "./TimerControls";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";
import TimerStatus from "./TimerStatus";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return currentSession => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const initialState = {
    focusDuration: 25,
    breakDuration: 5,
  };

  const limits = {
    focusUpperLimit: 60,
    focusLowerLimit: 5,
    breakUpperLimit: 15,
    breakLowerLimit: 1,
  };

  const [timerState, setTimerState] = useState({ ...initialState });

  const increaseDuration = (duration, upperLimit) =>
    Math.min(duration + 1, upperLimit);

  const decreaseDuration = (duration, lowerLimit) =>
    Math.max(lowerLimit, duration - 1);

  const increaseFocusDuration = () => {
    setTimerState({
      ...timerState,
      focusDuration: increaseDuration(
        timerState.focusDuration,
        limits.focusUpperLimit
      ),
    });
  };

  const decreaseFocusDuration = () => {
    setTimerState({
      ...timerState,
      focusDuration: decreaseDuration(
        timerState.focusDuration,
        limits.focusLowerLimit
      ),
    });
  };

  const increaseBreakDuration = () => {
    setTimerState({
      ...timerState,
      breakDuration: increaseDuration(
        timerState.breakDuration,
        limits.breakUpperLimit
      ),
    });
  };

  const decreaseBreakDuration = () => {
    setTimerState({
      ...timerState,
      breakDuration: decreaseDuration(
        timerState.breakDuration,
        limits.breakLowerLimit
      ),
    });
  };

  const resetTimers = () => {
    setIsTimerRunning(false);
    setSession(null);
    setTimerState({ ...initialState });
  };
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(
          nextSession(timerState.focusDuration, timerState.breakDuration)
        );
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning(prevState => {
      const nextState = !prevState;
      if (nextState) {
        setSession(prevStateSession => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: timerState.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(timerState.focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocusDuration}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocusDuration}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(timerState.breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreakDuration}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreakDuration}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
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

      <TimerStatus session={session} />
    </div>
  );
}

export default Pomodoro;
