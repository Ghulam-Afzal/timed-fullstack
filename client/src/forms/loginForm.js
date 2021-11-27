import "./form.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../services/login";

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erorrMessage, setErrorMessage] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedTaskAppUser", JSON.stringify(user));
      loginUser();
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage(true); 
    }
  };

  return (
    <div className="form-container">
      <div className="hidden-logo">TIMED</div>

      <form onSubmit={login}>
        <h2>Login</h2>
        <div style={erorrMessage ? {color:'red'} : {display:'none'}}>Username or Password is incorrect</div>
        <div>
          <p className="form-name">Username</p>
          <input
          className="form-input"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p className="form-name">Password</p>
          <input
          className="form-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          login
        </button>
        <p>
            Dont have a account?{" "}
            <Link to="/signup" className="form-link">
              <span>Sign Up</span>
            </Link>
          </p>
      </form>
    </div>
  );
};

export default LoginForm;
