import React from 'react';
import {
  Link
} from "react-router-dom";
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      attemptsRemaining: 10,
      prevGuesses: [],
    };
  }
  render() {
    return (
        <div className="game">
          <div className="game-body">
            <h1>Mastermind Game</h1>
            <div>
              Attempts left: {this.state.attemptsRemaining}
            </div>
            <div>
              <p>Please enter your PIN</p>
              <input></input>
              <button>Submit</button>
            </div>
            <div className='container-log'>
              <div className='log'>
                <div>Logs:</div>
              </div>
            </div>
            <div>
              <button>Give up</button> 
              <button>Call Mom (Hint)</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Game;