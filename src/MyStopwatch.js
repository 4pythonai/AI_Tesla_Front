import React from "react";
import { useStopwatch } from "react-timer-hook";
import styled, { createGlobalStyle } from "styled-components";

function MyStopwatch() {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "20px" }}>
        <span style={{ width: "80px" }}>{minutes}</span>:
        <span style={{ width: "80px" }}>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default MyStopwatch;
