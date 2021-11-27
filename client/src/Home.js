import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import image1 from "./svgs/in_no_time.svg";
import image2 from "./svgs/time_management.svg";
import image3 from "./svgs/undraw_Code_thinking_re_gka2.svg";
import logo from "./svgs/undraw_Coding_re_iv62.svg";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="hero">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="section-title">TIMED</h1>
          <p className="home-text">
            Welcome to Timed!
          </p>
        </div>

        <div>
          <div className="section">
            <div className="section-text">
              <h1 className="section-title">Countdown</h1>
              <p className="home-text">
                Do you need a countdown timer, than this is the perfect page for you.
              </p>
              <Link to="/countdown">
                <button className="home-btn">Countdown</button>
              </Link>
            </div>
            <img src={image1} alt="countdown" className="image" />
          </div>

          <div className="section section-alt">
            <div className="section-text">
              <h1 className="section-title">Animedoro</h1>
              <p className="home-text">
                What is animedoro you may ask?
                If you've heard of the pomodoro techinique than you may have a idea of what animedoro is. 
                Essentially you you do work for about 40-60 minutes and then take a 20 minute break to watch 
                a episode of a anime. 
                If this is your first time here than you can head right over to sign up to get account to start 
                using animedoro timer. If you already have a account than you can head right over and start using the 
                timer.
              </p>
              <Link to="/animedoro">
                <button className="home-btn home-btn-alt">Animedoro</button>
              </Link>
              <Link to="/signup">
                <button className="home-btn home-btn-alt">Signup</button>
              </Link>
            </div>
            <img src={image3} alt="animedoro" className="image" />
          </div>

          <div className="section">
            <div className="section-text">
              <h1 className="section-title">Stopwatch</h1>
              <p className="home-text">
                Do you need a stopwatch, than this timer is perfect for you!
              </p>
              <Link to="/stopwatch">
                <button className="home-btn">Stopwatch</button>
              </Link>
            </div>
            <img src={image2} alt="stopwatch" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
