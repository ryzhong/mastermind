import React from 'react';
import {
  Link
} from "react-router-dom";
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
        <div className="home">
          <div className="home-body">
            <h1>Mastermind Game</h1>
            <h3>You have 7,002 Bitcoins on the line.</h3>
            <div>
              <button><Link to="/game">Start Game</Link></button>
            </div>
          </div>
        </div>
    )
  }
}

export default Home;