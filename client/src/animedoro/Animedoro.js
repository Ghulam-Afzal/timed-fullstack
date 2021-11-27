import "./Animedoro.css";
import React, { useState, useEffect } from "react";
import AnimedoroCore from "./AnimedoroCore";
import Navbar from "../navbar/Navbar";
import taskService from "../services/tasks";
import LoginForm from "../forms/loginForm";

function Animedoro() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedTaskAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      taskService.setToken(user.token);
    }
  }, []);

  const loginUser = (user) => {
    setUser(user);
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm loginUser={loginUser} />
      </div>
    );
  };

  const logout = () => {
    taskService.setToken(null);
    window.localStorage.removeItem("loggedTaskAppUser");
    setUser(null);

  };
  return (
    <div>
      <Navbar />
      {user === null ? loginForm() : <AnimedoroCore logout={logout}/>}
    </div>
  );
}

export default Animedoro;
