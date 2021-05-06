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
      userLogs: [],
      showModal: false,
      result: '',
      hintsRemaining: 4,
      hintsGiven: [],
    };

    this.handlePINSubmit = this.handlePINSubmit.bind(this);
    this.isPINValid = this.isPINValid.bind(this);
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
      if (pin.isPINCorrect(this.state.guess)) {
        this.addToLog('correct')
        this.win();
      } else {
        let guessResult = pin.hasCorrectNumDigit(this.state.guess, this.state.pinLength);
        if (guessResult) {
          this.addToLog(guessResult)
          console.log(guessResult)
        }
      }
      this.setState({ attemptsRemaining: this.state.attemptsRemaining - 1 }, () => {
        if (this.state.attemptsRemaining === 0) this.lose();
      })
      this.setState({ guess: '' })
    }
  }

  isPINValid() {
    return this.state.guess.length === this.state.pinLength;
  }

  //adds result to log
  addToLog(result) {
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
    this.setState({ userLogs: [currentGuess, ...this.state.userLogs] })
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  win() {
    this.setState({ showModal: true, result: 'win' })
  }

  lose() {
    this.setState({ showModal: true, result: 'lose' })
  }

  resetGame() {
    this.setState({
      pinLength: 4,
      guess: '',
      attemptsRemaining: 10,
      userLogs: [],
      showModal: false,
      result: '',
      hintsRemaining: 4,
      hintsGiven: [],
    })
    pin.setRandomPIN(4, 0, 7);
  }

  playAgain() {
    this.toggleModal();
    this.resetGame();
  }

  //move this to pin.js
  //move setting state to give hint
  getHint() {
    let userPIN = pin.getPIN().split('');
    this.state.hintsGiven.forEach(number => {
      userPIN.splice(userPIN.indexOf(number), 1)
    })
    console.log(userPIN)
    let hintIndex = Math.floor(Math.random() * (this.state.pinLength - this.state.hintsGiven.length))
    console.log(hintIndex)
    this.setState({ hintsGiven: [...this.state.hintsGiven, userPIN[hintIndex]] }) //move this to giveHint
    return userPIN[hintIndex];
  }

  async giveHint() {
    if (pin.getPIN().length === 0) {
      this.addToLog('wait')
    }
    if (this.state.hintsRemaining > 0) {
      let hint = await this.getHint();
      this.addToLog('hint', hint)
      this.setState({ hintsRemaining: this.state.hintsRemaining - 1 })
    } else {
      this.addToLog('No more hints.')
    }
  }

  render() {
    return (
      <div className="game">
        <Modal show={this.state.showModal} result={this.state.result} play={this.playAgain} />
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
          <div>
            <Logs guesses={this.state.userLogs} />
          </div>
          <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><button>Give Up</button></Link>
            <button onClick={this.giveHint}>Call Mom (Hints Remaining: {this.state.hintsRemaining})</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;