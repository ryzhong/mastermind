import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Home from './pages/Home.js'
import Game from './pages/Game.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Router>

          <Switch>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

      </Router>

    );
  }
}

export default App;
