import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import TimerStatus from "./TimerStatus";
import TimerControls from "./TimerControls";

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
  // Set initial values for both timers
  const initialState = {
    focusDuration: 25,
    breakDuration: 5,
  };

  // Store timer upper and lower limits as well as adjustment intervals
  const limitsAndIntervals = {
    focus: { upperLimit: 60, lowerLimit: 5, interval: 5 },
    break: { upperLimit: 15, lowerLimit: 1, interval: 1 },
  };

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  // Sets default timer durations
  const [timerState, setTimerState] = useState({ ...initialState });

  // Increase the timer's duration by the timer's interval, limited to its upper limit
  const increaseTime = (duration, interval, upperLimit) =>
    Math.min(duration + interval, upperLimit);

  // Decrease the timer's duration by the timer's interval, limited to its lower limit
  const decreaseTime = (duration, interval, lowerLimit) =>
    Math.max(lowerLimit, duration - interval);

  const changeTimerDuration = (label, direction) => {
    const timerLabel = `${label}Duration`;
    const timerDuration = timerState[timerLabel];
    const timerInterval = limitsAndIntervals[label].interval;
    const timerUpperLimit = limitsAndIntervals[label].upperLimit;
    const timerLowerLimit = limitsAndIntervals[label].lowerLimit;

    if (direction === "+") {
      setTimerState(timerState => {
        return {
          ...timerState,
          [timerLabel]: increaseTime(
            timerDuration,
            timerInterval,
            timerUpperLimit
          ),
        };
      });
    } else if (direction === "-") {
      setTimerState(timerState => {
        return {
          ...timerState,
          [timerLabel]: decreaseTime(
            timerDuration,
            timerInterval,
            timerLowerLimit
          ),
        };
      });
    }
  };

  // Resets the states to default values
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
      <TimerControls
        session={session}
        timerState={timerState}
        isTimerRunning={isTimerRunning}
        changeTimerDuration={changeTimerDuration}
        playPause={playPause}
        resetTimers={resetTimers}
      />
      <TimerStatus
        timerState={timerState}
        session={session}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
