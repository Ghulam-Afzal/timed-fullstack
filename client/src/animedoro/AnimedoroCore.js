import "./Animedoro.css";
import React, { useState, useEffect } from "react";
import { createTask, initializeTasks } from "./taskReducer";
import { useSelector, useDispatch } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function AnimedoroCore({ logout }) {
  const [isActive, setActive] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [session, setSession] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [formMinutes, setFormMinutes] = useState(25);
  const [formSeconds, setFormSeconds] = useState(0);
  const [title, setTitle] = useState("No title specified ");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  const data = JSON.parse(window.localStorage.getItem("loggedTaskAppUser"));
  const userId = data["id"];

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  let interval;
  useEffect(() => {
    interval = setInterval(() => {
      clearInterval(interval);
      
      if(isActive){
        if (seconds === 0 && minutes === 0){
          setActive(false)
        }
        if (seconds === 0){
          if (minutes !== 0){
            setSeconds(59)
            setMinutes(minutes - 1)
          }else { 
            let minutes = isBreak ? formMinutes : formMinutes / 5
            let seconds = 0
            setSeconds(seconds)
            setMinutes(minutes)
            setIsBreak(!isBreak);
            if (!isBreak){
              addTask()
            }
            else {
              setSession(0)
            }
          }
        }else {
          setSeconds(seconds - 1)
          if (!isBreak){
            setSession(session + 1)
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [isActive, seconds, session, minutes, isBreak]);

  const handleStart = () => {
    setActive(true);
  };

  const handlePause = () => {
    setActive(false);
  };

  const handleReset = () => {
    clearInterval(interval);
    setActive(false);
    addTask();
    if (isBreak){
      setMinutes(formMinutes)
      setSeconds(formSeconds)
      setIsBreak(!isBreak)
    }else {
      setActive(false)
      setMinutes(formMinutes)
      setSeconds(formSeconds)
    }
    console.log(isBreak)
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const addTask = async () => {
    dispatch(createTask(title, session, userId));
    setTitle("title");
  };

  const submitFormData = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const secs = event.target.seconds.value;
    const minutes = event.target.minutes.value;
    event.target.minutes.value = "";
    event.target.seconds.value = "";
    event.target.title.value = "";
    setTitle(title);
    setFormMinutes(minutes);
    setFormSeconds(secs);
    setMinutes(minutes);
    setSeconds(secs);
    handleClose(); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const computeTime = (time) => {
    let hour = Math.floor(time / 3600)
    let min = Math.floor((time - (time / 3600)) / 60)
    let secs = time - (hour * 3600) - (min * 60)

    if (hour   < 10) {hour   = "0"+ hour;}
    if (min < 10) {min = "0" + min;}
    if (secs < 10) {secs = "0" + secs;}

    return hour + ':' + min + ':' + secs
  }


  const AModal = () => {
    const showHideClassName = open ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <AiOutlineClose className="close-btn" onClick={handleClose} />
          <form onSubmit={submitFormData}>
          <p className="form-name">Title of the task</p>
            <input className="form-input" name="title" />
            <p className="form-name">Minutes</p>
            <input className="form-input" name="minutes" type="number" min="0" max="60" required/>
            <p className="form-name">Seconds</p>
            <input className="form-input" name="seconds" type="number" min="0" max="60" required/>
            <button className="submit-btn" type="submit" >
              Submit
            </button>
          </form>
          </section>
        </div>
    );
  };

  return (
    <div>
      <div className="is">
        <AModal/>
        <div className="Pomodoro">
          <div className="Timer">
            <div>
              <div className="a-btns">
                <IoIosAddCircleOutline
                  onClick={() => setOpen(!open)}
                  className="burger"
                />
                <button className="logout-btn" onClick={logout}>
                  Log Out
                </button>
              </div>
              <p>Current Task: {title}</p>
              <p> The stop button will add a task and reset the timer.</p>
              <h1> Animedoro </h1>
              <h1>
                {timerMinutes}:{timerSeconds}
              </h1>
            </div>
            <div className="btns">
              <button className="btn" onClick={handleStart}>
                Start
              </button>
              <button className="btn" onClick={handlePause}>
                Pause
              </button>
              <button className="btn" onClick={handleReset}>
                Stop
              </button>
            </div>
          </div>
        </div>
        <div>
          <ul>
            {tasks.map((task) => (
              <li className="task" key={task.id}>
                <p>{task.title}</p>
                <p>{computeTime(task.taskTime)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnimedoroCore;
