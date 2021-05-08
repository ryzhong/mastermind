import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };
  }

  render() {
    const rules = this.state.showDescription
      ? <div className={this.state.showDescription ? 'show-description' : 'hide-description'}>
      <h4>Game Rules</h4>
      <p className='home-description'>
        You have a storage device that would allow you to get access to your 7,002 Bitcoins,
        however you threw away the piece of paper you wrote down your PIN on.
        Your storage device gives users limited number of guesses before it seizes up and encrypts its contents forever.
      </p>
        <p className='home-description'>
          You need to guess the correct PIN within the allotted attempts or you will lose all your Bitcoin.
          Luckily, your storage device has a special feature that will tell you if you guessed any of the numbers
          correctly. It tells you if you guessed any digits correctly, but does not tell you which digit you
          guessed correctly.
      </p>
    </div> : null;

    return (
      <div className="home">
        <div className="home-body">
          <h1>Mastermind Game</h1>
          <h3>You have 7,002 Bitcoins on the line.</h3>
          <img src='https://media.giphy.com/media/LukAHGCMfxMbK/source.gif' alt='bitcoin'></img>
          <div>
            <Link className='btn' to='/game'>Start Game</Link>
          </div>
          <div>
            <button className='btn' onClick={() => this.setState({ showDescription: !this.state.showDescription })}>Game Rules</button>
          </div>
          {rules}
        </div>
      </div>
    );
  }
}

export default Home;
