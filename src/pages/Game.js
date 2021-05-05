import React from 'react';
import {
  Link
} from "react-router-dom";
import './Game.css'
import pin from '../api/pin.js'
import Logs from '../components/logs.js'
import Modal from '../components/modal.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinLength: 4,
      guess: '',
      attemptsRemaining: 10,
      prevGuesses: [],
      showModal: false,
      result: '',
      hintsRemaining: 2,
      hintsGiven: [],
    };

    this.handlePINSubmit = this.handlePINSubmit.bind(this);
    this.isPINValid = this.isPINValid.bind(this);
    this.isPINCorrect = this.isPINCorrect.bind(this);
    this.hasCorrectNumDigit = this.hasCorrectNumDigit.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.giveHint = this.giveHint.bind(this);
    this.getHint = this.getHint.bind(this);
  }

  //Sets random pin when game page mounts
  componentDidMount() {
    pin.setRandomPIN(4, 0, 7);
  }

  //updates state and only accepts numbers as input
  handlePINChange(e) {
    let input = e.target.value;
    input = input.replace(/[^\d]+/g, '');
    this.setState({ guess: input })
  }

  //Makes sure PIN is valid, and logs results
  handlePINSubmit() {
    if (this.state.attemptsRemaining < 1) {
      this.setState({ guess: '' })
      return;
    }
    if (this.isPINValid()) {
      this.setState({ guess: '' })
      if (this.isPINCorrect()) {
        this.addToLog('correct')
      } else {
        let guessResult = this.hasCorrectNumDigit();
        if (guessResult) {
          this.addToLog(guessResult)
          console.log(guessResult)
        } 
      }
      this.setState({ attemptsRemaining: this.state.attemptsRemaining - 1 }, () => {
        if(this.state.attemptsRemaining === 0) this.lose();
      })
    }
  }

  isPINValid() {
    return this.state.guess.length === this.state.pinLength;
  }

  isPINCorrect() {
    return pin.getPIN() === this.state.guess;
  }

  hasCorrectNumDigit() {
    let arrPIN = pin.getPIN().split('');
    let arrGuess = this.state.guess.split('');
    for (let i = 0; i < this.state.pinLength; i++) {
      if (arrPIN[i] === arrGuess[i]) {
        return 'placement'
      }
    }
    for (let i = 0; i < this.state.pinLength; i++) {
      for (let j = 0; j < this.state.pinLength; j++) {
        if (arrGuess[i] === arrPIN[j]) {
          return 'number'
        }
      }
    }
    return 'wrong';
  }

  //adds result to log
  addToLog(result, hint) {
    let currentGuess = {};
    let feedback = `${this.state.guess}: `
    switch (result) {
      case 'placement':
        feedback += 'You have guessed a correct number and its location.';
        break;
      case 'number':
        feedback += 'You have guessed a correct number.';
        break;
      case 'correct':
        feedback += 'You have guessed the PIN correctly!';
        break;
      case 'hint':
        feedback = `Mom says she remembers your PIN containing: ${this.state.hintsGiven.join(', ')}.`;
        break;
      case 'No more hints.':
        feedback = 'You called mom, but mom does not have more information.'
        break;
      case 'wait':
        feedback = 'Please wait a little bit and call again. Mom is currently busy.'
        break;
      default:
        feedback += 'You have guessed the wrong PIN.'
    }
    currentGuess.guess = this.state.guess;
    currentGuess.feedback = feedback;
    this.setState({ prevGuesses: [currentGuess, ...this.state.prevGuesses] })
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  win() {
    this.setState({showModal: true, result: 'win'})
    this.resetGame();
  }

  lose() {
    this.setState({showModal: true, result: 'lose'})
    this.resetGame();
  }

  resetGame() {
    this.setState({
      pinLength: 4,
      guess: '',
      attemptsRemaining: 10,
      prevGuesses: [],
      showModal: false,
      result: '',
      hintsRemaining: 2,
      hintsGiven: [],
    })
    pin.setRandomPIN(4, 0, 7);
  }

  playAgain() {
    this.toggleModal();
  }

  getHint() {
    let userPIN = pin.getPIN().split('');
    this.state.hintsGiven.forEach( number => {
      userPIN.splice(userPIN.indexOf(number), 1)
    })
    console.log(userPIN)
    let hintIndex = Math.floor(Math.random() * (this.state.pinLength - this.state.hintsGiven.length))
    console.log(hintIndex)
    this.setState({hintsGiven: [...this.state.hintsGiven, userPIN[hintIndex]]})
    return userPIN[hintIndex];
  }

  async giveHint() {
    if(pin.getPIN().length === 0) {
      this.addToLog('wait')
    }
    if(this.state.hintsRemaining > 0) {
      let hint = await this.getHint();
      this.addToLog('hint', hint)
      this.setState({hintsRemaining: this.state.hintsRemaining - 1})
    } else {
      this.addToLog('No more hints.')
    }
  }

  render() {
    return (
      <div className="game">
        <Modal show={this.state.showModal} result={this.state.result} play={this.playAgain}/>
        <div className="game-body">
          <h1>Mastermind Game</h1>
          <div>
            Attempts Remaining: {this.state.attemptsRemaining}
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
              <Logs guesses={this.state.prevGuesses} />
            </div>
          </div>
          <div>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}><button>Give Up</button></Link>
            <button onClick={this.giveHint}>Call Mom (Hints Remaining: {this.state.hintsRemaining})</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;