import "./form.css";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import signUpService from "../services/signup";

export const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwrd2, setPassword2] = useState(""); 
  const [showError, setShowError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [redirect, setRedirect] = useState(false);

  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwrd2) {
        setErrorMessage('passwords do not match'); 
        setShowError(true)
        return 
    }
    if (username === "" || name === '' || password === '' || passwrd2 === ''){
      setErrorMessage("Missing Inputs")
      setShowError(true)
      return 
    }
    if (!regularExpression.test(password)) {
      setErrorMessage("Password should contain atleast 1 uppercase and 1 number")
      setShowError(true)
      return 
    }
    try {
      const user = await signUpService.signup({
        username,
        name,
        password,
      });
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  const form = () => {
    return (
      <div className="form-container">
        <div className="hidden-logo">TIMED</div>

        <form onSubmit={handleSubmit}>
          <h3 className="form-title">SignUp</h3>
          <div style={showError ? {color:'red'} : {display:'none'}}>{errorMessage}</div>
          <fieldset>
            <label>
              <p className="form-name">Name</p>
              <input
                name="name"
                className="form-input"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label>
              <p className="form-name">Username</p>
              <input
                name="username"
                className="form-input"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
            <label>
              <p className="form-name">Password</p>
              <input
                type="password"
                name="password"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <label>
              <p className="form-name">Confrim Password</p>
              <input
                type="password"
                name="password2"
                className="form-input"
                onChange={(e) => setPassword2(e.target.value)}
              ></input>
            </label>
          </fieldset>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <p>
            Already have a account?{" "}
            <Link to="/animedoro" className="form-link">
              <span>Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    );
  };

  return <div>{redirect === false ? form() : <Redirect to="/" />}</div>;
};
