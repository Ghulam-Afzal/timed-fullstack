import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Countdown from './countdown/Countdown.js';
import Animedoro from './animedoro/Animedoro.js';
import Stopwatch from './stopwatch/Stopwatch.js';
import { SignUpPage } from './signUpPage/SignUpPage.js';
import Home from './Home.js';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/countdown' component={Countdown} />
          <Route path='/animedoro' component={Animedoro} />
          <Route path='/stopwatch' component={Stopwatch} />
          <Route path='/signup' component={SignUpPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
