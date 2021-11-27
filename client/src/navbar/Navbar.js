import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./navbar.css";

export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  const openNav = () => {};

  return (
    <div>
      <nav className="Nav">
        <Link className="nav-link" to="/">
          TIMED
        </Link>
        <FaBars className="nav-bars" onClick={() => setOpen(!open)} />
        <div className="nav-menu" id={open ? "hidden" : ""}>
          <Link className="nav-link" to="/countdown">
            Countdown
          </Link>
          <Link className="nav-link" to="/animedoro">
            Animedoro
          </Link>
          <Link className="nav-link" to="/stopwatch">
            Stopwatch
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
}
