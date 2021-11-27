import "./stopwatch.css";
import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";

function Stopwatch() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [lapTime, setLapTime] = useState(0);
  const [lapCounter, setLapCounter] = useState(1);
  const [laps, setLaps] = useState([]);

  let interval;
  useEffect(() => {
      interval = setInterval(() => {
      clearInterval(interval);
      console.log(`interval in useeffect: ${interval}`)

      if (isActive && !isPaused) {
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
          setLapTime(lapTime + 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds, lapTime]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    clearInterval(interval);
    console.log(`resseting interval in reset: ${interval}`)
    setIsActive(false)
    setIsPaused(true)
    setSeconds(0)
    setMinutes(0)
    setLapTime(0)
    setLaps([])

  };

  const addLap = () => {
    setLaps((prevState) => [
      ...prevState,
      {
        LapNum: lapCounter,
        LapTime: lapTime,
      },
    ]);
    setLapCounter(lapCounter + 1);
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div>
      <Navbar />
      <div className="stopwatch-page-continaer">
        <div className="stopwatch-main">
          <h1>Stopwatch</h1>
          <h3>
            {timerMinutes}:{timerSeconds}
          </h3>
          <div className="btns">
            <button className="btn" onClick={startTimer}>
              Start
            </button>
            <button className="btn" onClick={addLap}>
              Lap
            </button>
            <button className="btn" onClick={pauseTimer}>
              Pause
            </button>
            <button className="btn" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
        <div>
          <ul >
            {laps.map((lap) => (
              <li className="stop-task" key={lap.LapNum}>
                <p>Lap {lap.LapNum}</p>
                <p>{lap.LapTime}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
