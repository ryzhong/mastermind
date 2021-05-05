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
            <img src='https://media.giphy.com/media/LukAHGCMfxMbK/source.gif' alt='bitcoin'></img>
            <div>
              <Link to="/game" style={{textDecoration: 'none', color: 'black'}}><button>Start Game</button></Link>
            </div>
          </div>
        </div>
    )
  }
}

export default Home;