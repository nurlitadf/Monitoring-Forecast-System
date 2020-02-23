import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Admin from './Admin';
import Home from './Home';
import Navigation from './Navigation';

const App = () => (
    <Router>
        <Switch>
          <Route path="/admin">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Navigation />
                <Admin />
              </div>
            </div>
          </Route>

          <Route path="/">
            <React.Fragment>
              <Navigation />
              <Home/>
            </React.Fragment>
          </Route>
        </Switch>
    </Router>
  );

export default App;
