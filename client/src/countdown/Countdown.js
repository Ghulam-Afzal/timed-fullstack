import "./Countdown.css";
import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "../navbar/Navbar";
import Modal from '../components/Modal.js'; 

function Countdown() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [formMinutes, setFormMinutes] = useState(25);
  const [formSeconds, setFormSeconds] = useState(0);
  const [open, setOpen] = useState(false);

  let interval;
  useEffect(() => {
      interval = setInterval(() => {
      clearInterval(interval);
      console.log(`interval in ruseeffect: ${interval}`)
      if (isActive && !isPaused) {
        if (minutes === 0 && seconds === 0) {
          setIsActive(false);
          setIsPaused(true);
        }
        if (seconds === 0 && !isPaused) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setSeconds(formSeconds);
            setMinutes(formMinutes);
          }
        } else {
            setSeconds(seconds - 1);      
        }
      }
    }, 1000);
  }, [isActive, isPaused, seconds]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    // this clear interval has cuased me so much pain
    clearInterval(interval);
    console.log(`resseting interval in reset: ${interval}`)
    setIsActive(false);
    setIsPaused(true);
    setSeconds(formSeconds);
    setMinutes(formMinutes);
  };

  const formData = (event) => {
    event.preventDefault()
    const secs = event.target.seconds.value;
    const minutes = event.target.minutes.value;
    event.target.minutes.value = "";
    event.target.seconds.value = "";
    setFormMinutes(minutes);
    setFormSeconds(secs);
    setMinutes(minutes);
    setSeconds(secs);
  };


  const close = () => {
    setOpen(false); 
  }


  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div>
      <Navbar />
      <div className="Countdown-container">
        <IoIosAddCircleOutline
          onClick={() => setOpen(!open)}
          className="burger"
        />
        <Modal show={open} handleClose={close} formData={formData}/>
        <h1 className="Countdown-title">Countdown</h1>
        <div className="Countdown-main">
          <h3>
            {timerMinutes}:{timerSeconds}
          </h3>
          <div className="btns">
            <button className="btn" onClick={startTimer}>Start</button>
            <button className="btn" onClick={pauseTimer}>Pause</button>
            <button className="btn" onClick={resetTimer}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
