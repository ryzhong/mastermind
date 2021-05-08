import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Game.css';
import pin from '../api/pin.js';
import Logs from '../components/logs.js';
import Modal from '../components/modal.js';
import win from '../assets/win.mp3';
import lose from '../assets/lose.mp3';
import wrong from '../assets/wrong.mp3';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinLength: 4,
      start: 0,
      end: 7,
      guess: '',
      attemptsRemaining: 10,
      userLogs: [],
      showModal: false,
      result: '',
      hintsRemaining: 4,
      hintsGiven: [],
      guessResult: {},
    };

    this.handlePINSubmit = this.handlePINSubmit.bind(this);
    this.isPINValid = this.isPINValid.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.giveHint = this.giveHint.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // Sets random pin when game page mounts
  componentDidMount() {
    pin.setRandomPIN(4, 0, 7);
  }

  // updates state and only accepts numbers as input
  handlePINChange(e) {
    let input = e.target.value;
    input = input.replace(/[^\d]+/g, '');
    this.setState({ guess: input });
  }

  // Makes sure PIN is valid, and logs results
  handlePINSubmit(e) {
    e.preventDefault();
    if (this.state.attemptsRemaining < 1) {
      this.setState({ guess: '' });
      return;
    }
    if (this.isPINValid()) {
      if (pin.isPINCorrect(this.state.guess)) {
        this.addToLog('correct');
        this.win();
      } else {
        const audio = new Audio(wrong);
        audio.play();
        const guessResult = pin.hasCorrectNumDigit(this.state.guess, this.state.pinLength);
        if (guessResult) {
          this.setState({ guessResult }, () => this.addToLog('guess'));
        }
      }
      this.setState({ attemptsRemaining: this.state.attemptsRemaining - 1 }, () => {
        if (this.state.attemptsRemaining === 0) this.lose();
      });
      this.setState({ guess: '' });
    }
  }

  /**
   * Checks to see if the length of PIN is correct
   * @returns boolean
   */
  isPINValid() {
    return this.state.guess.length === this.state.pinLength;
  }

  // adds result to log
  addToLog(result) {
    const currentGuess = {};
    let feedback;
    switch (result) {
      case 'guess':
        feedback = `${this.state.guessResult.guess}: Correct: {Number & Placement: ${this.state.guessResult.placement}  
          Number Only: ${this.state.guessResult.number}}`;
        break;
      case 'hint':
        feedback = `Mom says she remembers your PIN containing: ${this.state.hintsGiven.join(', ')}.`;
        break;
      case 'No more hints.':
        feedback = 'You called mom, but mom does not have more information.';
        break;
      case 'wait':
        feedback = 'Please wait a little bit and call again. Mom is currently busy.';
        break;
      default:
        feedback = `${this.state.guessResult.guess}: You have guessed the wrong PIN.`;
    }
    currentGuess.guess = this.state.guessResult.guess;
    currentGuess.feedback = feedback;
    this.setState({ userLogs: [currentGuess, ...this.state.userLogs] });
  }

  // Sets the state of modal to be visible or not
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  // Plays the winning audio sound and makes modal visible
  win() {
    const audio = new Audio(win);
    audio.play();
    this.setState({ showModal: true, result: 'win' });
  }

  // Plays the losing audio sound and makes modal visible
  lose() {
    const audio = new Audio(lose);
    audio.play();
    this.setState({ showModal: true, result: 'lose' });
  }

  //Resets to original state and sets a new PIN
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
    });
    pin.setRandomPIN(4, 0, 7);
  }

  // Removes the modal and resets the game
  playAgain() {
    this.toggleModal();
    this.resetGame();
  }

  // Sets the hint from getHint()
  giveHint() {
    if (this.state.hintsRemaining > 0) {
      const hint = pin.getHint(this.state.hintsGiven, this.state.pinLength);
      if (hint === undefined) {
        this.addToLog('wait');
        return;
      }
      this.setState({ hintsGiven: [...this.state.hintsGiven, hint] }, () => {
        this.addToLog('hint', hint);
      });
      this.setState({ hintsRemaining: this.state.hintsRemaining - 1 });
    } else {
      this.addToLog('No more hints.');
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
            <div className='pin-description'>Your PIN is {this.state.pinLength} digits long and each number is between {this.state.start} - {this.state.end}</div>
            <form autoComplete='off' onSubmit={(e) => this.handlePINSubmit(e)}>
              <input type='text'
                id='PIN'
                name='PIN'
                autoComplete='off'
                maxLength={this.state.pinLength}
                value={this.state.guess}
                onChange={(e) => this.handlePINChange(e)}>
              </input>

              <input type='submit' value='Submit'></input>
            </form>
          </div>
          <div>
            <Logs guesses={this.state.userLogs} />
          </div>
          <div>
            <Link className='btn' to='/'>Give Up</Link>
            <button className='btn' onClick={this.giveHint}>Call Mom (Hints Remaining: {this.state.hintsRemaining})</button>
            <button className='btn' onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
