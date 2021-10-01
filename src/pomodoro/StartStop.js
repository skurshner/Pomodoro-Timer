import React from "react";
import classNames from "../utils/class-names";
import PropTypes from "prop-types";

const StartStop = ({ isTimerRunning, session, playPause, resetTimers }) => {
  // Return falsy if there is no active session
  const getSessionStatus = () => (session ? "" : true);

  return (
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
          <button
            disabled={getSessionStatus()}
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
  );
};

StartStop.propTypes = {
  isTimerRunning: PropTypes.bool,
  session: PropTypes.object,
  playPause: PropTypes.func,
  resetTimers: PropTypes.func,
};

export default StartStop;
