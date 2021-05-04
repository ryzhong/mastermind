import React from 'react';
// import {
//   Link
// } from "react-router-dom";
import './Game.css'
import pin from '../api/pin.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinLength: 4,
      guess: '',
      attemptsRemaining: 10,
      prevGuesses: [],
    };

    this.handlePINSubmit = this.handlePINSubmit.bind(this);
    this.isPINValid = this.isPINValid.bind(this);
  }

  componentDidMount() {
    pin.setRandomPIN(4, 0, 7);
  }

  handlePINChange(e) {
    let input = e.target.value;
    input = input.replace(/[^\d]+/g, '');
    console.log(input)
    this.setState({guess: input})
  }

  handlePINSubmit() {
    if(this.state.attemptsRemaining < 1) {
      this.setState({guess: ''})
      return;
    }
    if(this.isPINValid()) {
      this.setState({attemptsRemaining: this.state.attemptsRemaining - 1})
      this.setState({guess: ''})
      console.log('submitted')
      if(this.isPINCorrect()) {
        console.log('correct')
      } else {
        console.log('wrong')
        let guessResult = this.hasValidDigit();
        if(guessResult) {
          console.log(guessResult)
        }
      }
      
    }
  }

  isPINValid() {
    return this.state.guess.length === this.state.pinLength;
  }

  isPINCorrect() {
    return pin.getPIN() === this.state.guess;
  }

  hasValidDigit() {
    let arrPIN = pin.getPIN().split('');
    let arrGuess = this.state.guess.split('');
    for(let i = 0; i < this.state.pinLength; i++) {
      if(arrPIN[i] === arrGuess[i]) return 'placement';
    }
    for(let i = 0; i < this.state.pinLength; i++) {
      if(arrPIN.includes(arrGuess[i])) return 'digit';
    }
    return false;
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
                onChange={e => this.handlePINChange(e)}>
                </input>
              <button onClick={this.handlePINSubmit}>Submit</button>
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