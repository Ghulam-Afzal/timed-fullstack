import React from "react";
import Navbar from "../navbar/Navbar";
import { SignUpForm } from '../forms/signUpForm'

export const SignUpPage = () => {
  return (
    <div>
      <Navbar />
      <SignUpForm />
    </div> 
  );
};
