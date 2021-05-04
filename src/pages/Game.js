import React from 'react';
import {
  Link
} from "react-router-dom";
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinLength: 4,
      guess: '',
      attemptsRemaining: 10,
      prevGuesses: [],
    };
  }

  handleChange(e) {
    let input = e.target.value;
    input = input.replace(/[^\d]+/g, '');
    console.log(input)
    this.setState({guess: input})
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
              <input type='text' 
                maxLength={this.state.pinLength} 
                value={this.state.guess} 
                onChange={e => this.handleChange(e)}>
                </input>
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